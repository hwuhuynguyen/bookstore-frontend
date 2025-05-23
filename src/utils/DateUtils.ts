class DateUtils {
  static convertTimestampToUTC(dateStr: string): string {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    // Convert to Vietnam time (UTC+7)
    const vnOffset = 7 * 60; // 7 hours in minutes
    const localTime = new Date(date.getTime() + vnOffset * 60 * 1000);

    const day = String(localTime.getUTCDate()).padStart(2, "0");
    const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
    const year = localTime.getUTCFullYear();

    const hour = String(localTime.getUTCHours()).padStart(2, "0");
    const minute = String(localTime.getUTCMinutes()).padStart(2, "0");
    const second = String(localTime.getUTCSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }

  static convertTimestampToDate(dateStr: string): string {
    if (!dateStr) return ""; // or return 'N/A'

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // invalid date check

    const vnOffset = 7 * 60; // 7 hours in minutes
    const localTime = new Date(date.getTime() + vnOffset * 60 * 1000);

    const day = String(localTime.getUTCDate()).padStart(2, "0");
    const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
    const year = localTime.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
}

export default DateUtils;
