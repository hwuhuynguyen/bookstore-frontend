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

  static CLIENT_BOOK = apiPath + "/books";
  static CLIENT_CATEGORY = apiPath + "/categories";
  static CLIENT_CART = apiPath + "/cart";

  static RECOMMENDATION_BASE = apiPath + "/recommend";

  static CLIENT_ORDER = apiPath + "/orders";
  static CLIENT_CHECKOUT = this.CLIENT_ORDER + "/checkout";
  static CLIENT_GET_MY_ORDERS = this.CLIENT_ORDER + "/my-orders";

  static CLIENT_PAYMENT_VNPAY_RETURN = apiPath + "/payment/vnpay-return";

  // --- ADMIN ROUTE ---
  static ADMIN_GET_ALL_ORDERS = this.CLIENT_ORDER + "/all-orders";
  static ADMIN_GET_ALL_USERS = this.USER_BASE + "/all";
}

export default ResourceURL;
