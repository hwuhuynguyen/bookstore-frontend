class ApplicationConstants {
  static HOME_PATH = import.meta.env.VITE_REACT_APP_API_URL;
  static API_PATH = ApplicationConstants.HOME_PATH + "/api";

  static DEFAULT_CLIENT_CATEGORY_PAGE_SIZE = 9;
  static DEFAULT_CLIENT_SEARCH_PAGE_SIZE = 12;
  static DEFAULT_CLIENT_WISHLIST_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_USER_REVIEW_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_PRODUCT_REVIEW_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_NOTIFICATION_PAGE_SIZE = 5;
  static DEFAULT_CLIENT_ORDER_PAGE_SIZE = 5;

  static DEFAULT_THUMBNAIL_URL =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png";

  static BOOK_PRICE_OPTIONS = [
    [0, 100000],
    [100000, 200000],
    [200000, 400000],
    [400000, 600000],
    [600000, 1000000],
    [1000000, null],
  ];

  static BOOK_RATING_OPTIONS = ["5", "4", "3", "2", "1"];

  static BOOK_SOURCE_OPTIONS = [
    {
      value: "1",
      label: "ThriftBooks",
    },
    {
      value: "2",
      label: "Book Crossing",
    },
    {
      value: "3",
      label: "GoodReads",
    },
    {
      value: "4",
      label: "System",
    },
  ];

  static ORDER_STATUSES = [
    "PENDING",
    "PROCESSING",
    "DELIVERING",
    "COMPLETED",
    "CANCELLED",
  ];

  static CANCELABLE_STATUSES = ["PENDING", "PROCESSING"];

  static DELIVERING_STATUS = "DELIVERING";

  static PAYMENT_STATUSES = [
    "PENDING",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
    "REFUNDED",
  ];
}

export default ApplicationConstants;
