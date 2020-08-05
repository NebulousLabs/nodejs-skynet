"use strict";

const axios = require("axios");
const p = require("path");
const fs = require("fs");
const urljoin = require("url-join");

const defaultPortalUrl = "https://siasky.net";

const uriSkynetPrefix = "sia://";

function defaultOptions(endpointPath) {
  return {
    portalUrl: defaultPortalUrl,
    endpointPath: endpointPath,

    APIKey: "",
    customUserAgent: "",
  };
}

/**
 * Creates and executes a request.
 * @param {Object} config - Configuration for the request.
 * @param {string} config.method - HTTP method to use.
 * @param {string} [config.APIKey] - Authentication password to use.
 * @param {string} [config.customUserAgent=""] - Custom user agent header to set.
 * @param {Object} [config.data=null] - Data to send in a POST.
 * @param {string} [config.endpointPath=""] - The relative URL path of the portal endpoint to contact.
 * @param {string} [config.extraPath=""] - Extra path element to append to the URL.
 * @param {Function} [config.onUploadProgress] - Optional callback to track progress.
 * @param {Object} [config.params={}] - Query parameters to include in the URl.
 * @param {string} [config.responseType=""] - The type of data that the server will respond with.
 */
function executeRequest(config) {
  let url = makeUrl(config.portalUrl, config.endpointPath, config.extraPath ? config.extraPath : "");

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
  });
}

/**
 * Properly joins paths together to create a URL. Takes a variable number of
 * arguments.
 */
function makeUrl() {
  let args = Array.from(arguments);
  return args.reduce(function (acc, cur) {
    return urljoin(acc, cur);
  });
}

function walkDirectory(path, out) {
  let files = [];
  if (!fs.existsSync(path)) {
    return files;
  }

  for (const subpath of fs.readdirSync(path)) {
    const fullpath = p.join(path, subpath);
    if (fs.statSync(fullpath).isDirectory()) {
      files = files.concat(walkDirectory(fullpath, out));
      continue;
    }
    files.push(fullpath);
  }
  return files;
}

function trimSiaPrefix(str) {
  return str.replace(uriSkynetPrefix, "");
}

module.exports = {
  defaultOptions,
  defaultPortalUrl,
  executeRequest,
  makeUrl,
  uriSkynetPrefix,
  walkDirectory,
  trimSiaPrefix,
};
