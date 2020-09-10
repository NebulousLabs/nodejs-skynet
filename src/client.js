const axios = require("axios");

const { defaultPortalUrl, makeUrl } = require("./utils.js");

class SkynetClient {
  /**
   * The Skynet Client which can be used to access Skynet.
   * @constructor
   * @param {string} [portalUrl="https://siasky.net"] - The portal URL to use to access Skynet, if specified. To use the default portal while passing custom options, use "".
   * @param {Object} [customOptions={}] - Configuration for the client.
   * @param {string} [customOptions.method] - HTTP method to use.
   * @param {string} [customOptions.APIKey] - Authentication password to use.
   * @param {string} [customOptions.customUserAgent=""] - Custom user agent header to set.
   * @param {Object} [customOptions.data=null] - Data to send in a POST.
   * @param {string} [customOptions.endpointPath=""] - The relative URL path of the portal endpoint to contact.
   * @param {string} [customOptions.extraPath=""] - Extra path element to append to the URL.
   * @param {Function} [customOptions.onUploadProgress] - Optional callback to track progress.
   * @param {Object} [customOptions.params={}] - Query parameters to include in the URl.
   */
  constructor(portalUrl = defaultPortalUrl(), customOptions = {}) {
    this.portalUrl = portalUrl;
    this.customOptions = customOptions;
  }

  /**
   * Creates and executes a request.
   * @param {Object} config - Configuration for the request. See docs for constructor for the full list of options.
   */
  executeRequest(config) {
    const url = makeUrl(config.portalUrl, config.endpointPath, config.extraPath ? config.extraPath : "");

    return axios({
      url: url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.customUserAgent && { "User-Agent": config.customUserAgent },
      auth: config.APIKey && { username: "", password: config.APIKey },
      responseType: config.responseType,
      onUploadProgress:
        config.onUploadProgress &&
        function ({ loaded, total }) {
          const progress = loaded / total;

          config.onUploadProgress(progress, { loaded, total });
        },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }
}

module.exports = { SkynetClient };

// Get the following files to run or the client's methods won't be defined.
require("./download.js");
require("./encryption.js");
require("./upload.js");
