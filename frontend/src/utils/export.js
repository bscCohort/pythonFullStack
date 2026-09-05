// utils/export.js
//
// Downloading data as CSV or PDF, using libraries instead of hand-written code.
//
// WHY LIBRARIES HERE
//
// This used to be three hand-written files, about 160 lines, and two things
// about them were hard to teach:
//
//   1. The CSV code had to explain quoting rules: a value containing a comma
//      must be wrapped in quotes, and a quote inside becomes two quotes.
//      Interesting once, then just a distraction.
//
//   2. The "PDF" export did not make a PDF at all. It opened a new tab and
//      called window.print(), so the BROWSER made the PDF. The function was
//      named exportToPDF, which misled everyone including me.
//
// Now papaparse does the CSV and jsPDF makes a real PDF file. Both are one
// call, and neither needs a caveat.

import Papa from "papaparse";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Turn a list of objects into a .csv file the browser downloads.
//
// rows    : [{ id: 1, name: "Aarav" }, ...]
// columns : [{ key: "id", label: "ID" }, { key: "name", label: "Name" }]
export function downloadCsv(filename, rows, columns) {
  // Papa.unparse builds the CSV text and handles every quoting rule for us.
  const csv = Papa.unparse({
    fields: columns.map((c) => c.label),
    data: rows.map((row) => columns.map((c) => row[c.key])),
  });

  // A Blob is a file held in memory. The browser cannot write to your disk
  // directly, so we make a temporary link and click it for the user.
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Turn a list of objects into a real .pdf file the browser downloads.
export function downloadPdf(filename, title, subtitle, rows, columns) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(title, 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(subtitle, 14, 25);

  // autoTable draws the table, works out column widths, and adds extra pages
  // when the rows do not fit. All of that would be painful by hand.
  autoTable(doc, {
    startY: 32,
    head: [columns.map((c) => c.label)],
    body: rows.map((row) => columns.map((c) => row[c.key])),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  // Unlike the old print-dialog version, this really does save a PDF.
  doc.save(filename);
}
