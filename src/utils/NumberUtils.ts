class NumberUtils {
  static readablePriceOption([min, max]: (number | null)[]) {
    const toCurrency = (value: number) =>
      value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    if (min !== null && max === null) {
      return `Over ${toCurrency(min)}`;
    }
    if (min !== null && max !== null) {
      return `${toCurrency(min)} - ${toCurrency(max)}`;
    }
    return "Unknown price range";
  }

  static generatePriceOptions(quartiles: (number | null)[][]) {
    return quartiles;
  }
}

export default NumberUtils;
