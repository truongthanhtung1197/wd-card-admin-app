import { useCallback, useState } from "react";

import { MAX_PRICE } from "@/constant/Order.constant";
import { Service } from "@/model/Partner.model";

// @ts-ignore
import * as ExcelJS from "exceljs";
import { toast } from "sonner";

// Định nghĩa interface cho dữ liệu pack theo CreateOrEditService
export interface PackExcelData {
  name: string; // Tên pack (bắt buộc)
  type: string; // Loại service (bắt buộc: TRAFFIC, ENTITY, BACKLINK, TOOL)
  price: number; // Giá (bắt buộc)
  urlDemo: string; // Demo URL (bắt buộc)
  note?: string; // Ghi chú
  complimentaries?: string[]; // Danh sách ưu đãi kèm theo (ngăn cách bằng dấu |)
  isShow?: boolean; // Hiển thị trên market
  discountPackService?: number; // Giảm giá
}

// Cấu hình các trường bắt buộc
const REQUIRED_FIELDS = ["name", "type", "price", "urlDemo"];

// Dropdown options
const SERVICE_TYPE_OPTIONS = ["TRAFFIC", "ENTITY", "BACKLINK", "TOOL"];
const BOOLEAN_DROPDOWN = ["TRUE", "FALSE"];

// Template Excel headers cho pack
export const EXCEL_HEADERS = [
  { key: "name", label: "TÊN PACK", dropdown: null },
  { key: "type", label: "LOẠI DỊCH VỤ", dropdown: SERVICE_TYPE_OPTIONS },
  { key: "price", label: "GIÁ (VND)", dropdown: null },
  { key: "urlDemo", label: "DEMO URL", dropdown: null },
  { key: "note", label: "GHI CHÚ", dropdown: null },
  { key: "complimentaries", label: "ƯU ĐÃI KÈM THEO", dropdown: null },
  { key: "isShow", label: "HIỂN THỊ TRÊN MARKET", dropdown: BOOLEAN_DROPDOWN },
  { key: "discountPackService", label: "GIẢM GIÁ (VND)", dropdown: null },
];

// Headers cho export data hiện tại
export const EXPORT_HEADERS = [
  { key: "name", label: "TÊN PACK" },
  { key: "type", label: "LOẠI DỊCH VỤ" },
  { key: "price", label: "GIÁ" },
  { key: "urlDemo", label: "DEMO URL" },
  { key: "note", label: "GHI CHÚ" },
  { key: "partner", label: "PARTNER" },
  { key: "status", label: "TRẠNG THÁI" },
  { key: "discountPackService", label: "GIẢM GIÁ" },
];

// Validation errors interface
interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export const useExcelImport = () => {
  // PACK
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );

  // Tạo file Excel mẫu với ExcelJS và dropdown hoạt động
  const downloadTemplate = useCallback(async () => {
    try {
      // Tạo workbook và worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("PACK_TEMPLATE");

      // Header row
      const headerRow = EXCEL_HEADERS.map((h) => h.label);
      worksheet.addRow(headerRow);

      // Instruction row với hướng dẫn đúng
      const instructionRow = EXCEL_HEADERS.map((h) => {
        if (h.dropdown) {
          return `(Chọn: ${h.dropdown.join(", ")})`;
        }
        switch (h.key) {
          case "name":
          case "type":
          case "price":
          case "urlDemo":
            return "(Bắt buộc)";
          case "price":
          case "discountPackService":
            return "(Số tiền VND)";
          case "complimentaries":
            return "(Ngăn cách bằng |)";
          case "note":
            return "(Ghi chú tùy chọn)";
          default:
            return "(Tùy chọn)";
        }
      });
      worksheet.addRow(instructionRow);

      // Example rows với data thực tế
      const exampleRows = [
        [
          "Pack Traffic Website",
          "TRAFFIC",
          500000,
          "https://demo.traffic.com",
          "Tăng traffic website chất lượng",
          "Báo cáo chi tiết|Hỗ trợ 24/7|Tăng trưởng bền vững",
          "TRUE",
          50000,
        ],
        [
          "Pack Entity SEO",
          "ENTITY",
          800000,
          "https://demo.entity.com",
          "Tối ưu hóa entity cho website",
          "Schema markup|Knowledge panel|Local SEO",
          "TRUE",
          80000,
        ],
        [
          "Pack Backlink Authority",
          "BACKLINK",
          1200000,
          "https://demo.backlink.com",
          "Xây dựng backlink chất lượng cao",
          "DA 50+|DoFollow|Niche liên quan",
          "FALSE",
          0,
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

      // Style instruction row
      const instructionRowObj = worksheet.getRow(2);
      instructionRowObj.font = { italic: true, color: { argb: "666666" } };
      instructionRowObj.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "F2F2F2" },
      };
      instructionRowObj.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
      instructionRowObj.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Style example rows
      for (let i = 3; i <= 5; i++) {
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
        switch (index) {
          case 0: // Tên pack
            column.width = 25;
            break;
          case 1: // Loại dịch vụ
            column.width = 15;
            break;
          case 2: // Giá
          case 7: // Giảm giá
            column.width = 12;
            break;
          case 3: // Demo URL
            column.width = 30;
            break;
          case 4: // Ghi chú
            column.width = 25;
            break;
          case 5: // Ưu đãi
            column.width = 35;
            break;
          case 6: // Hiển thị
            column.width = 18;
            break;
          default:
            column.width = 15;
        }
      });

      // Thêm data validation (dropdown) cho các cột
      EXCEL_HEADERS.forEach((header, colIndex) => {
        if (header.dropdown && header.dropdown.length > 0) {
          const columnLetter = String.fromCharCode(65 + colIndex); // A, B, C...

          (worksheet as any).dataValidations.add(
            `${columnLetter}3:${columnLetter}1000`,
            {
              type: "list",
              allowBlank: true,
              showDropDown: true,
              formulae: [`"${header.dropdown.join(",")}"`],
              showErrorMessage: true,
              errorStyle: "error",
              errorTitle: "Giá trị không hợp lệ",
              error: `Vui lòng chọn một trong: ${header.dropdown.join(", ")}`,
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
      link.setAttribute("download", "pack_template.xlsx");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Đã tải xuống file mẫu Pack Excel với dropdown hoạt động!");
    } catch (error) {
      console.error("Error downloading template:", error);
      toast.error("Có lỗi khi tải xuống file mẫu");
    }
  }, []);

  // Export data hiện tại từ table
  const exportCurrentData = useCallback((data: Service[]) => {
    try {
      // Import động xlsx-js-style cho export
      // @ts-ignore
      const XLSX = require("xlsx-js-style");

      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu để xuất");
        return;
      }

      // Header
      const headerRow = EXPORT_HEADERS.map((h) => h.label);

      // Convert data
      const dataRows = data.map((item) => [
        item.name || "",
        item.type || "",
        item.price || 0,
        item.urlDemo || "",
        item.note || "",
        item.user?.username || "",
        item.status || "",
        item.discountPackService || 0,
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
      XLSX.utils.book_append_sheet(wb, ws, "PACK_DATA");

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      XLSX.writeFile(wb, `pack_data_${dateStr}.xlsx`);

      toast.success(`Đã xuất ${data.length} pack thành công!`);
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Có lỗi khi xuất file Excel");
    }
  }, []);

  // Validate dữ liệu
  const validateData = useCallback((data: any[]): ValidationError[] => {
    const errors: ValidationError[] = [];
    data.forEach((row, index) => {
      const rowNumber = row.__excelRow || index + 3;
      // Bắt buộc
      REQUIRED_FIELDS.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push({
            row: rowNumber,
            field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" là bắt buộc`,
          });
        }
      });
      // Dropdown type
      if (row.type && !SERVICE_TYPE_OPTIONS.includes(row.type)) {
        errors.push({
          row: rowNumber,
          field: "type",
          message:
            '"LOẠI DỊCH VỤ" phải là một trong: ' +
            SERVICE_TYPE_OPTIONS.join(", "),
        });
      }
      // Validate số
      ["price", "discountPackService"].forEach((field) => {
        if (
          row[field] &&
          (isNaN(Number(row[field])) ||
            Number(row[field]) < 0 ||
            Number(row[field]) > MAX_PRICE)
        ) {
          errors.push({
            row: rowNumber,
            field,
            message: `Trường "${EXCEL_HEADERS.find((h) => h.key === field)?.label}" phải là số >= 0 và <= ${MAX_PRICE}`,
          });
        }
      });
      // Validate giảm giá <= giá gốc
      if (
        row.discountPackService &&
        row.price &&
        Number(row.discountPackService) > Number(row.price)
      ) {
        errors.push({
          row: rowNumber,
          field: "discountPackService",
          message: `Giảm giá không được lớn hơn giá gốc`,
        });
      }
      // Validate boolean isShow
      let isShowVal = row.isShow;
      if (typeof isShowVal === "boolean")
        isShowVal = isShowVal ? "TRUE" : "FALSE";
      if (isShowVal && !BOOLEAN_DROPDOWN.includes(isShowVal)) {
        errors.push({
          row: rowNumber,
          field: "isShow",
          message: '"HIỂN THỊ TRÊN MARKET" phải là TRUE hoặc FALSE',
        });
      }
    });
    return errors;
  }, []);

  // Xử lý file Excel import
  const handleFileImport = useCallback(
    async (file: File, onSuccess: (data: PackExcelData[]) => void) => {
      setLoading(true);
      setValidationErrors([]);

      try {
        // Kiểm tra file type
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
          toast.error("Vui lòng chọn file Excel (.xlsx hoặc .xls)");
          return;
        }

        // Đọc file Excel với ExcelJS
        const buffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // Lấy worksheet đầu tiên
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          toast.error("File Excel không có dữ liệu");
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
                const cellValue = cleanValues[index];
                // Convert giá trị cell thành string để xử lý
                rowData[headerKey] =
                  cellValue !== undefined && cellValue !== null
                    ? String(cellValue).trim()
                    : "";
              }
            });

            // Chỉ thêm row nếu có ít nhất tên pack
            if (rowData.name) {
              rows.push(rowData);
            }
          }
        });

        if (rows.length === 0) {
          toast.error("File không có dữ liệu hợp lệ (từ dòng 3 trở đi)");
          return;
        }

        // Validate dữ liệu
        const errors = validateData(rows);

        if (errors.length > 0) {
          setValidationErrors(errors);
          const errorMessage = errors
            .slice(0, 5)
            .map((err) => `Dòng ${err.row + 1}: ${err.message}`) // +1 vì có instruction row
            .join("\n");

          toast.error(
            `Có ${errors.length} lỗi trong file:\n${errorMessage}${errors.length > 5 ? "\n..." : ""}`,
          );
          return;
        }

        // Convert và format dữ liệu đúng theo form
        const formattedData: PackExcelData[] = rows.map((row) => ({
          name: row.name,
          type: row.type,
          price: row.price ? Number(row.price) : 0,
          urlDemo: row.urlDemo,
          note: row.note || undefined,
          complimentaries: row.complimentaries
            ? row.complimentaries
                .split("|")
                .map((item: string) => item.trim())
                .filter(Boolean)
            : undefined,
          isShow: row.isShow === "TRUE" || row.isShow === true,
          discountPackService: row.discountPackService
            ? Number(row.discountPackService)
            : undefined,
        }));

        toast.success(`Import thành công ${formattedData.length} pack`);
        onSuccess(formattedData);
      } catch (error) {
        console.error("Error importing Excel file:", error);
        toast.error(
          "Có lỗi khi đọc file Excel. Vui lòng kiểm tra file có đúng định dạng không.",
        );
      } finally {
        setLoading(false);
      }
    },
    [validateData],
  );

  return {
    loading,
    validationErrors,
    downloadTemplate,
    handleFileImport,
    setValidationErrors,
    exportCurrentData,
  };
};
