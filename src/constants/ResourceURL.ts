import ApplicationConstants from "./ApplicationConstants";

export const LOGIN_PATH = "/auth/login";

const apiPath = ApplicationConstants.API_PATH;

class ResourceURL {
  static LOGIN = apiPath + "/auth/login";
  static REGISTER = apiPath + "/auth/register";
  static REGENERATE_TOKEN = apiPath + "/auth/regenerate-token";

  static USER_BASE = apiPath + "/users";
  static CLIENT_USER_INFO = this.USER_BASE + "/personal-info";
  static CLIENT_USER_ADDRESS = this.CLIENT_USER_INFO + "/address";
  static CLIENT_USER_PASSWORD = this.CLIENT_USER_INFO + "/password"

  static CLIENT_BOOK = apiPath + "/books";
  static CLIENT_CATEGORY = apiPath + "/categories";
  static CLIENT_CART = apiPath + "/cart";

  static RECOMMENDATION_BASE = apiPath + "/recommend";

  static CLIENT_ORDER = apiPath + "/orders";
  static CLIENT_CHECKOUT = this.CLIENT_ORDER + "/checkout";
  static CLIENT_GET_MY_ORDERS = this.CLIENT_ORDER + "/my-orders";

  static AUTHOR_BASE = apiPath + "/authors";
  static CLIENT_PAYMENT_VNPAY_RETURN = apiPath + "/payment/vnpay-return";

  static WISHLIST_BASE = apiPath + "/wishlist";

  static REVIEW_BASE = apiPath + "/review";
  static CLIENT_GET_MY_REVIEWS = this.REVIEW_BASE + "/my-reviews";

  // --- ADMIN ROUTE ---
  static ADMIN_GET_ALL_ORDERS = this.CLIENT_ORDER + "/all-orders";
  static ADMIN_GET_ALL_USERS = this.USER_BASE + "/all";
  static ADMIN_GET_ALL_AUTHORS = this.AUTHOR_BASE + "/all";
}

export default ResourceURL;
