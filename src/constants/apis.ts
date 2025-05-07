import ApplicationConstants from "./ApplicationConstants";

export const LOGIN_PATH = "/auth/login";

const apiPath = ApplicationConstants.API_PATH;

class ResourceURL {
  static LOGIN = apiPath + '/auth/login';
  static REGENERATE_TOKEN = apiPath + '/auth/regenerate-token';

  static CLIENT_USER_INFO = apiPath + '/users/personal-info';
}

export default ResourceURL;