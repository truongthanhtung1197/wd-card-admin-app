import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportDomainsToExcel(domains: string[]) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Domains");

  // Cột A với header
  ws.columns = [{ header: "Domain Name", key: "domain", width: 30 }];

  // Thêm dữ liệu
  domains.forEach((d) => ws.addRow({ domain: d }));

  // Style hàng header (row 1)
  const headerRow = ws.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFCC00" }, // vàng
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Xuất file
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf], { type: "application/octet-stream" }), "domains.xlsx");
}
