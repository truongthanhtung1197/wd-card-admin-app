import { useCallback, useState } from "react";

import { MAX_PRICE } from "@/constant/Order.constant";
import { Service } from "@/model/Partner.model";

// @ts-ignore
import * as ExcelJS from "exceljs";
import { toast } from "sonner";

// Định nghĩa interface cho dữ liệu domain đầy đủ theo CreateOrEditService
export interface DomainExcelData {
  name: string; // Tên domain (bắt buộc)
  fieldType: string; // Loại lĩnh vực (bắt buộc)
  dr?: number; // DR
  refDomain?: number; // Ref Domain
  organicTraffic?: number; // Organic Traffic

  // TextLink Service
  textLinkPrice?: number; // Giá TextLink
  textLinkDuration?: number; // Thời hạn TextLink (tháng)
  textLinkNote?: string; // Ghi chú TextLink
  isFollowTextLink?: boolean; // DoFollow TextLink (true=DoFollow, false=NoFollow)
  isHomeTextLink?: boolean; // Home TextLink
  isFooterTextLink?: boolean; // Footer TextLink
  discountTextLinkService?: number; // Giảm giá TextLink

  // GuestPost Service
  guestPostPrice?: number; // Giá GuestPost
  guestPostNote?: string; // Ghi chú GuestPost
  isIndexGuestPost?: boolean; // Index GuestPost
  isFollowGuestPost?: boolean; // DoFollow GuestPost (true=DoFollow, false=NoFollow)
  discountGuestPostService?: number; // Giảm giá GuestPost

  // Banner Service
  bannerPrice?: number; // Giá Banner
  bannerDuration?: number; // Thời hạn Banner (tháng)
  discountBannerService?: number; // Giảm giá Banner

  // Service flags
  isSaleTextLink?: boolean; // Có bán TextLink
  isSaleGuestPost?: boolean; // Có bán GuestPost
  isSaleBanner?: boolean; // Có bán Banner
}

// Cấu hình các trường bắt buộc
const REQUIRED_FIELDS = ["name", "fieldType"];

// Dropdown options
const FIELD_TYPE_OPTIONS = ["TECHNICAL", "BUSINESS", "SPORT", "GENERAL"];
const BOOLEAN_DROPDOWN = ["TRUE", "FALSE"];

const DURATION_DROPDOWN = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

// Template Excel headers đúng theo CreateOrEditService form
export const EXCEL_HEADERS = [
  { key: "name", label: "TÊN DOMAIN", dropdown: null },
  { key: "fieldType", label: "LOẠI LĨNH VỰC", dropdown: FIELD_TYPE_OPTIONS },
  { key: "textLinkPrice", label: "GIÁ TEXTLINK", dropdown: null },
  {
    key: "textLinkDuration",
    label: "THỜI HẠN TEXTLINK (tháng)",
    dropdown: DURATION_DROPDOWN,
  },
  { key: "textLinkNote", label: "GHI CHÚ TEXTLINK", dropdown: null },
  {
    key: "isFollowTextLink",
    label: "DOFOLLOW TEXTLINK",
    dropdown: BOOLEAN_DROPDOWN,
  },
  { key: "isHomeTextLink", label: "HOME TEXTLINK", dropdown: BOOLEAN_DROPDOWN },
  {
    key: "isFooterTextLink",
    label: "FOOTER TEXTLINK",
    dropdown: BOOLEAN_DROPDOWN,
  },
  {
    key: "discountTextLinkService",
    label: "GIẢM GIÁ TEXTLINK",
    dropdown: null,
  },
  { key: "guestPostPrice", label: "GIÁ GUESTPOST", dropdown: null },
  { key: "guestPostNote", label: "GHI CHÚ GUESTPOST", dropdown: null },
  {
    key: "isIndexGuestPost",
    label: "INDEX GUESTPOST",
    dropdown: BOOLEAN_DROPDOWN,
  },
  {
    key: "isFollowGuestPost",
    label: "DOFOLLOW GUESTPOST",
    dropdown: BOOLEAN_DROPDOWN,
  },
  {
    key: "discountGuestPostService",
    label: "GIẢM GIÁ GUESTPOST",
    dropdown: null,
  },
  { key: "bannerPrice", label: "GIÁ BANNER", dropdown: null },
  {
    key: "bannerDuration",
    label: "THỜI HẠN BANNER (tháng)",
    dropdown: DURATION_DROPDOWN,
  },
  { key: "discountBannerService", label: "GIẢM GIÁ BANNER", dropdown: null },
  { key: "isSaleTextLink", label: "BÁN TEXTLINK", dropdown: BOOLEAN_DROPDOWN },
  {
    key: "isSaleGuestPost",
    label: "BÁN GUESTPOST",
    dropdown: BOOLEAN_DROPDOWN,
  },
  { key: "isSaleBanner", label: "BÁN BANNER", dropdown: BOOLEAN_DROPDOWN },
  { key: "isShow", label: "HIỂN THỊ TRÊN SÀN", dropdown: BOOLEAN_DROPDOWN },
];

// Headers cho export data hiện tại
export const EXPORT_HEADERS = [
  { key: "name", label: "TÊN DOMAIN" },
  { key: "fieldType", label: "LĨNH VỰC" },
  { key: "partner", label: "PARTNER" },
  { key: "status", label: "TRẠNG THÁI" },
  { key: "guestPostPrice", label: "GIÁ GUEST POST" },
  { key: "bannerPrice", label: "GIÁ BANNER" },
  { key: "textLinkPrice", label: "GIÁ TEXT LINK" },
];

// Validation errors interface
interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export const useExcelImport = () => {
  // DOMAIN
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );

  // Tạo file Excel mẫu với ExcelJS và dropdown thật sự hoạt động
  const downloadTemplate = useCallback(async () => {
    try {
      // Tạo workbook và worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("DOMAIN_TEMPLATE");

      // Header row
      const headerRow = EXCEL_HEADERS.map((h) => h.label);
      worksheet.addRow(headerRow);

      // Example rows với data thực tế theo form
      const exampleRows = [
        // Chỉ bán TextLink (điền đầy đủ các trường bắt buộc)
        [
          "textlink.com", // TÊN DOMAIN (bắt buộc)
          "TECHNICAL", // LOẠI LĨNH VỰC (bắt buộc)
          400000, // GIÁ TEXTLINK (bắt buộc nếu bán TextLink)
          "6", // THỜI HẠN TEXTLINK (bắt buộc nếu bán TextLink)
          "Ghi chú textlink", // GHI CHÚ TEXTLINK (tuỳ chọn)
          "TRUE", // DOFOLLOW TEXTLINK (tuỳ chọn)
          "FALSE", // HOME TEXTLINK (tuỳ chọn)
          "TRUE", // FOOTER TEXTLINK (tuỳ chọn)
          20000, // GIẢM GIÁ TEXTLINK (tuỳ chọn)
          "", // GIÁ GUESTPOST (bỏ trống vì không bán GuestPost)
          "", // GHI CHÚ GUESTPOST
          "FALSE", // INDEX GUESTPOST
          "FALSE", // DOFOLLOW GUESTPOST
          0, // GIẢM GIÁ GUESTPOST
          0, // GIÁ BANNER
          "12", // THỜI HẠN BANNER
          0, // GIẢM GIÁ BANNER
          "TRUE", // BÁN TEXTLINK (bắt buộc: ít nhất 1 dịch vụ bán)
          "FALSE", // BÁN GUESTPOST
          "FALSE", // BÁN BANNER
          "TRUE", // HIỂN THỊ TRÊN SÀN
        ],
        // Chỉ bán GuestPost (điền đầy đủ các trường bắt buộc)
        [
          "guestpost.vn", // TÊN DOMAIN (bắt buộc)
          "BUSINESS", // LOẠI LĨNH VỰC (bắt buộc)
          0, // GIÁ TEXTLINK
          "", // THỜI HẠN TEXTLINK
          "", // GHI CHÚ TEXTLINK
          "FALSE", // DOFOLLOW TEXTLINK
          "FALSE", // HOME TEXTLINK
          "FALSE", // FOOTER TEXTLINK
          0, // GIẢM GIÁ TEXTLINK
          900000, // GIÁ GUESTPOST (bắt buộc nếu bán GuestPost)
          "Ghi chú guestpost", // GHI CHÚ GUESTPOST (tuỳ chọn)
          "TRUE", // INDEX GUESTPOST
          "TRUE", // DOFOLLOW GUESTPOST
          90000, // GIẢM GIÁ GUESTPOST (tuỳ chọn)
          0, // GIÁ BANNER
          "", // THỜI HẠN BANNER
          0, // GIẢM GIÁ BANNER
          "FALSE", // BÁN TEXTLINK
          "TRUE", // BÁN GUESTPOST (bắt buộc: ít nhất 1 dịch vụ bán)
          "FALSE", // BÁN BANNER
          "FALSE", // HIỂN THỊ TRÊN SÀN
        ],
      ];
      exampleRows.forEach((row) => worksheet.addRow(row));

      // Style header row
      const headerRowObj = worksheet.getRow(1);
      headerRowObj.font = { bold: true, color: { argb: "FFFFFF" } };
      headerRowObj.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4472C4" },
      };
      headerRowObj.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      headerRowObj.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Style example rows với border
      for (let i = 2; i <= 3; i++) {
        const row = worksheet.getRow(i);
        row.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }

      // Set column widths
      worksheet.columns.forEach((column, index) => {
        const header = headerRow[index];
        column.width = Math.max(15, Math.min(header.length + 3, 25));
      });

      // Thêm data validation (dropdown) cho các cột
      EXCEL_HEADERS.forEach((header) => {
        const dropdown = header.dropdown;
        if (dropdown && dropdown.length > 0) {
          const columnLetter = String.fromCharCode(
            65 + EXCEL_HEADERS.indexOf(header),
          );
          (worksheet as any).dataValidations.add(
            `${columnLetter}2:${columnLetter}1000`,
            {
              type: "list",
              allowBlank: true,
              showDropDown: true,
              formulae: [`"${dropdown.join(",")}"`],
              showErrorMessage: true,
              errorStyle: "error",
              errorTitle: "Giá trị không hợp lệ",
              error: `Vui lòng chọn một trong: ${dropdown.join(", ")}`,
            },
          );
        }
      });

      // Xuất file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "domain_template.xlsx");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Đã tải xuống file mẫu Excel với dropdown hoạt động!");
    } catch (error) {
      setValidationErrors([
        { row: 0, field: "", message: "Có lỗi khi tải xuống file mẫu" },
      ]);
    }
  }, []);

  // Export data hiện tại từ table (giữ nguyên code cũ với xlsx-js-style)
  const exportCurrentData = useCallback((data: Service[]) => {
    try {
      // Import động xlsx-js-style cho export
      // @ts-ignore
      const XLSX = require("xlsx-js-style");

      if (!data || data.length === 0) {
        setValidationErrors([
          { row: 0, field: "", message: "Không có dữ liệu để xuất" },
        ]);
        return;
      }

      // Header
      const headerRow = EXPORT_HEADERS.map((h) => h.label);

      // Convert data
      const dataRows = data.map((item) => [
        item.name || "",
        item.fieldType || "",
        item.user?.username || "",
        item.status || "",
        // Giá sau chiết khấu GuestPost
        (item.guestPostPrice || 0) - (item.discountGuestPostService || 0),
        // Giá sau chiết khấu Banner
        (item.bannerPrice || 0) - (item.discountBannerService || 0),
        // Giá sau chiết khấu TextLink
        (item.textLinkPrice || 0) - (item.discountTextLinkService || 0),
      ]);

      // Sheet data
      const wsData = [headerRow, ...dataRows];
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Style cho header
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        fill: { fgColor: { rgb: "217C5E" } },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };

      // Apply style cho header
      for (let c = 0; c < headerRow.length; c++) {
        const cell = XLSX.utils.encode_cell({ r: 0, c });
        if (!ws[cell]) continue;
        ws[cell].s = headerStyle;
      }

      // Set width cho từng cột
      ws["!cols"] = headerRow.map(() => ({ wch: 18 }));

      // Tạo workbook và xuất file
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DOMAIN_DATA");

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      XLSX.writeFile(wb, `domain_data_${dateStr}.xlsx`);

      toast.success(`Đã xuất ${data.length} domain thành công!`);
    } catch (error) {
      console.error("Error exporting data:", error);
      setValidationErrors([
        { row: 0, field: "", message: "Có lỗi khi xuất file Excel" },
      ]);
    }
  }, []);

  // Validate dữ liệu được cập nhật
  const validateData = (data: any[]): ValidationError[] => {
    const errors: ValidationError[] = [];

    data.forEach((row, index) => {
      const rowNumber = row.__excelRow || index + 2;

      // Kiểm tra các trường bắt buộc
      REQUIRED_FIELDS.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push({
            row: rowNumber,
            field: field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" là bắt buộc`,
          });
        }
      });

      // Validate dropdown fields
      EXCEL_HEADERS.forEach((header) => {
        if (
          header.dropdown &&
          row[header.key] !== undefined &&
          row[header.key] !== ""
        ) {
          let cellValue = row[header.key];
          if (typeof cellValue === "boolean") {
            // keep as is
          }
          if (!header.dropdown.includes(cellValue as never)) {
            errors.push({
              row: rowNumber,
              field: header.key,
              message: `"${header.label}" phải là một trong: ${header.dropdown.join(", ")}`,
            });
          }
        }
      });

      // Validate số
      const numberFields = [
        "textLinkPrice",
        "textLinkDuration",
        "discountTextLinkService",
        "guestPostPrice",
        "discountGuestPostService",
        "bannerPrice",
        "bannerDuration",
        "discountBannerService",
      ];
      numberFields.forEach((field) => {
        if (row[field] && isNaN(Number(row[field]))) {
          errors.push({
            row: rowNumber,
            field: field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" phải là số`,
          });
        }
      });

      // Validate boolean fields
      EXCEL_HEADERS.forEach((header) => {
        if (header.dropdown === BOOLEAN_DROPDOWN) {
          let cellValue = row[header.key];
          if (typeof cellValue === "boolean")
            cellValue = cellValue ? "TRUE" : "FALSE";
          if (typeof cellValue === "string")
            cellValue = cellValue.toUpperCase();
          if (!BOOLEAN_DROPDOWN.includes(cellValue)) {
            errors.push({
              row: rowNumber,
              field: header.key,
              message: `"${header.label}" phải là một trong: ${BOOLEAN_DROPDOWN.join(", ")}`,
            });
          }
        }
      });

      // Validate duration
      const durationFields = ["textLinkDuration", "bannerDuration"];
      durationFields.forEach((field) => {
        if (row[field] && !DURATION_DROPDOWN.includes(String(row[field]))) {
          errors.push({
            row: rowNumber,
            field: field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" phải là 1-12 (tháng)`,
          });
        }
      });

      // Validate price
      const priceFields = [
        "textLinkPrice",
        "guestPostPrice",
        "bannerPrice",
        "discountTextLinkService",
        "discountGuestPostService",
        "discountBannerService",
      ];
      priceFields.forEach((field) => {
        if (
          row[field] &&
          (isNaN(Number(row[field])) ||
            Number(row[field]) < 0 ||
            Number(row[field]) > MAX_PRICE)
        ) {
          errors.push({
            row: rowNumber,
            field: field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" phải là số >= 0 và <= ${MAX_PRICE}`,
          });
        }
      });

      // Validate discount <= price
      if (
        row["discountTextLinkService"] &&
        row["textLinkPrice"] &&
        Number(row["discountTextLinkService"]) > Number(row["textLinkPrice"])
      ) {
        errors.push({
          row: rowNumber,
          field: "discountTextLinkService",
          message: `Giảm giá TextLink không được lớn hơn giá gốc`,
        });
      }
      if (
        row["discountGuestPostService"] &&
        row["guestPostPrice"] &&
        Number(row["discountGuestPostService"]) > Number(row["guestPostPrice"])
      ) {
        errors.push({
          row: rowNumber,
          field: "discountGuestPostService",
          message: `Giảm giá GuestPost không được lớn hơn giá gốc`,
        });
      }
      if (
        row["discountBannerService"] &&
        row["bannerPrice"] &&
        Number(row["discountBannerService"]) > Number(row["bannerPrice"])
      ) {
        errors.push({
          row: rowNumber,
          field: "discountBannerService",
          message: `Giảm giá Banner không được lớn hơn giá gốc`,
        });
      }

      // Validate bắt buộc giá Banner và GuestPost nếu bán
      if (
        (row.isSaleBanner === "TRUE" || row.isSaleBanner === true) &&
        (!row.bannerPrice || isNaN(Number(row.bannerPrice)))
      ) {
        errors.push({
          row: rowNumber,
          field: "bannerPrice",
          message:
            'Trường "GIÁ BANNER" là bắt buộc khi bán Banner và phải là số hợp lệ',
        });
      }
      if (
        (row.isSaleGuestPost === "TRUE" || row.isSaleGuestPost === true) &&
        (!row.guestPostPrice || isNaN(Number(row.guestPostPrice)))
      ) {
        errors.push({
          row: rowNumber,
          field: "guestPostPrice",
          message:
            'Trường "GIÁ GUESTPOST" là bắt buộc khi bán GuestPost và phải là số hợp lệ',
        });
      }
    });

    return errors;
  };

  // Xử lý file Excel import với ExcelJS
  const handleFileImport = async (
    file: File,
    onSuccess: (data: DomainExcelData[]) => void,
  ) => {
    setLoading(true);
    setValidationErrors([]);

    try {
      // Kiểm tra file type
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        setValidationErrors([
          {
            row: 0,
            field: "",
            message: "Vui lòng chọn file Excel (.xlsx hoặc .xls)",
          },
        ]);
        return;
      }

      // Đọc file Excel với ExcelJS
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      // Lấy worksheet đầu tiên
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        setValidationErrors([
          { row: 0, field: "", message: "File Excel không có dữ liệu" },
        ]);
        return;
      }

      const rows: any[] = [];
      let headers: string[] = [];

      // Đọc tất cả rows
      worksheet.eachRow((row, rowNumber) => {
        const rowValues = row.values as any[];
        // Bỏ qua index 0 (ExcelJS array bắt đầu từ index 1)
        const cleanValues = rowValues.slice(1);

        if (rowNumber === 1) {
          // Row 1: Headers
          headers = cleanValues.map((val) => String(val || "").trim());
        } else if (rowNumber > 2) {
          // Bỏ qua row 2 (instruction row), xử lý từ row 3 trở đi
          const rowData: any = {};

          headers.forEach((header, index) => {
            const headerKey = EXCEL_HEADERS.find(
              (h) => h.label === header,
            )?.key;
            if (headerKey) {
              let cellValue = cleanValues[index];
              // Nếu là trường boolean, ép về 'TRUE'/'FALSE'
              if (
                EXCEL_HEADERS.find((h) => h.key === headerKey)?.dropdown ===
                BOOLEAN_DROPDOWN
              ) {
                if (cellValue === true) cellValue = "TRUE";
                else if (cellValue === false) cellValue = "FALSE";
                else if (typeof cellValue === "string")
                  cellValue = cellValue.toUpperCase();
              }
              rowData[headerKey] =
                cellValue !== undefined && cellValue !== null
                  ? String(cellValue).trim()
                  : "";
            }
          });

          // Lưu lại số dòng thực tế trong file Excel
          rowData.__excelRow = rowNumber;

          // Chỉ thêm row nếu có ít nhất 1 field quan trọng
          if (rowData.name || rowData.fieldType) {
            rows.push(rowData);
          }
        }
      });

      if (rows.length === 0) {
        setValidationErrors([
          {
            row: 0,
            field: "",
            message: "File không có dữ liệu hợp lệ (từ dòng 3 trở đi)",
          },
        ]);
        return;
      }

      // Validate dữ liệu
      const errors = validateData(rows);

      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }

      // Convert và format dữ liệu đúng theo form
      const formattedData: DomainExcelData[] = rows.map((row) => ({
        name: row.name,
        typePack: "DOMAIN", // Bắt buộc cho API import
        fieldType: row.fieldType,

        // TextLink Service
        textLinkPrice: row.textLinkPrice
          ? Number(row.textLinkPrice)
          : undefined,
        textLinkDuration: row.textLinkDuration
          ? Number(row.textLinkDuration)
          : undefined,
        textLinkNote: row.textLinkNote || undefined,
        isFollowTextLink:
          row.isFollowTextLink === "TRUE" || row.isFollowTextLink === true,
        isHomeTextLink:
          row.isHomeTextLink === "TRUE" || row.isHomeTextLink === true,
        isFooterTextLink:
          row.isFooterTextLink === "TRUE" || row.isFooterTextLink === true,
        discountTextLinkService: row.discountTextLinkService
          ? Number(row.discountTextLinkService)
          : undefined,

        // GuestPost Service
        guestPostPrice: row.guestPostPrice
          ? Number(row.guestPostPrice)
          : undefined,
        guestPostNote: row.guestPostNote || undefined,
        isIndexGuestPost:
          row.isIndexGuestPost === "TRUE" || row.isIndexGuestPost === true,
        isFollowGuestPost:
          row.isFollowGuestPost === "TRUE" || row.isFollowGuestPost === true,
        discountGuestPostService: row.discountGuestPostService
          ? Number(row.discountGuestPostService)
          : undefined,

        // Banner Service
        bannerPrice: row.bannerPrice ? Number(row.bannerPrice) : undefined,
        bannerDuration: row.bannerDuration
          ? Number(row.bannerDuration)
          : undefined,
        discountBannerService: row.discountBannerService
          ? Number(row.discountBannerService)
          : undefined,

        // Service flags
        isSaleTextLink:
          row.isSaleTextLink === "TRUE" || row.isSaleTextLink === true,
        isSaleGuestPost:
          row.isSaleGuestPost === "TRUE" || row.isSaleGuestPost === true,
        isSaleBanner: row.isSaleBanner === "TRUE" || row.isSaleBanner === true,
        isShow: row.isShow === "TRUE" || row.isShow === true,
      }));

      toast.success(`Import thành công ${formattedData.length} domain`);
      onSuccess(formattedData);
    } catch (error) {
      setValidationErrors([
        {
          row: 0,
          field: "",
          message:
            "Có lỗi khi đọc file Excel. Vui lòng kiểm tra file có đúng định dạng không.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    validationErrors,
    downloadTemplate,
    handleFileImport,
    setValidationErrors,
    exportCurrentData,
  };
};
