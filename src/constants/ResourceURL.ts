import ApplicationConstants from "./ApplicationConstants";

export const LOGIN_PATH = "/auth/login";

const apiPath = ApplicationConstants.API_PATH;

class ResourceURL {
  static LOGIN = apiPath + '/auth/login';
  static REGISTER = apiPath + '/auth/register';
  static REGENERATE_TOKEN = apiPath + '/auth/regenerate-token';

  static CLIENT_USER_INFO = apiPath + '/users/personal-info';

  static CLIENT_BOOK = apiPath + '/books';
  static CLIENT_CATEGORY = apiPath + '/categories';
  static CLIENT_CART = apiPath + '/cart';
}

export default ResourceURL;