//write common util functions here.

export function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function formatDate(inputDateString: string): string {
  const date = new Date(inputDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function viewInvoiceDate(inputString: string) {
  const date = new Date(inputString);
  const year = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";
  const formattedDate = `${day}/${month}/${year} | ${hour}:${minute} ${period}`;
  return formattedDate;
}

export function downloadPDF(pdfContent: any, fileName: any) {
  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
}

export function getDateRange(
  input: string,
): { startDate: string; endDate: string } | string {
  const currentDate: Date = new Date();
  let startDate: Date, endDate: Date;

  switch (input) {
    case "This Week":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay(),
      ); // Start of current week (Sunday)
      endDate = currentDate;
      break;
    case "Last Week":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - 7,
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - 1,
      );
      break;
    case "Last 3 Months":
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        1,
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );
      break;
    default:
      return "Invalid input. Please provide 'This week', 'Last week', or 'Last 3 months'.";
  }

  return {
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
  };
}

export function getCustomFilterDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
