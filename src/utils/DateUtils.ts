class DateUtils {
  static convertTimestampToUTC(dateStr: string): string {
    const date = new Date(dateStr);
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
}

export default DateUtils;
