import { DomainOrder } from "@/model/Domain.model";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportStatisticsToExcel(detail?: DomainOrder) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Thống kê");

  // Define columns: Loại | Số lượng | Giá | Thành Tiền
  ws.columns = [
    { header: "Loại", key: "type", width: 24 },
    { header: "Số lượng", key: "quantity", width: 12 },
    { header: "Giá", key: "price", width: 24 },
    { header: "Thành Tiền", key: "amount", width: 24 },
  ];

  // Add data rows from summarizeDomains
  detail?.summarizeDomains?.forEach((item) => {
    const unitPrice = item.quantity ? item.amount / item.quantity : 0;
    ws.addRow({
      type: item.type,
      quantity: item.quantity,
      price: unitPrice,
      amount: item.amount,
    });
  });

  // Header styling
  const headerRow = ws.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFCC00" },
    };
  });

  // Number formatting for price/amount columns
  const numberFormat = "#,##0";
  const priceCol = ws.getColumn("price");
  const amountCol = ws.getColumn("amount");
  priceCol.numFmt = numberFormat;
  amountCol.numFmt = numberFormat;
  priceCol.alignment = { horizontal: "right" };
  amountCol.alignment = { horizontal: "right" };

  // Quantity center align
  ws.getColumn("quantity").alignment = { horizontal: "center" };

  // Add total row
  const totalRow = ws.addRow({
    type: "Tổng",
    quantity: detail?.domainsCount ?? 0,
    price: undefined,
    amount: detail?.price ?? 0,
  });
  totalRow.font = { bold: true };
  totalRow.eachCell((cell, colNumber) => {
    // Keep alignment similar to columns
    if (colNumber === 2) cell.alignment = { horizontal: "center" };
    if (colNumber === 3 || colNumber === 4)
      cell.alignment = { horizontal: "right" };
  });

  // Proposal code row: label in A, value spans B..D
  const proposeRow = ws.addRow([
    "Mã đề xuất",
    detail?.proposeCode || "",
    "",
    "",
  ]);
  const proposeRowNumber = proposeRow.number;
  // Merge cells B..D for the value
  ws.mergeCells(proposeRowNumber, 2, proposeRowNumber, 4);
  // Style
  proposeRow.getCell(1).font = { bold: true };
  proposeRow.getCell(1).alignment = { horizontal: "left" };
  proposeRow.getCell(2).alignment = { horizontal: "left" };

  // Export file
  const buf = await wb.xlsx.writeBuffer();
  const filename = "thong-ke-don-domain.xlsx";
  saveAs(new Blob([buf], { type: "application/octet-stream" }), filename);
}
