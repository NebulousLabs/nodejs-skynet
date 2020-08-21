"use strict";

const path = require("path");
const fs = require("fs");
const urljoin = require("url-join");

const defaultSkynetPortalUrl = "https://siasky.net";

const uriSkynetPrefix = "sia://";

function defaultOptions(endpointPath) {
  return {
    portalUrl: defaultPortalUrl(),
    endpointPath: endpointPath,

    APIKey: "",
    customUserAgent: "",
  };
}

// TODO: This will be smarter. See
// https://github.com/NebulousLabs/skynet-docs/issues/21.
function defaultPortalUrl() {
  return defaultSkynetPortalUrl;
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

function walkDirectory(filepath, out) {
  let files = [];
  if (!fs.existsSync(filepath)) {
    return files;
  }

  for (const subpath of fs.readdirSync(filepath)) {
    const fullpath = path.join(filepath, subpath);
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
  defaultSkynetPortalUrl,
  makeUrl,
  uriSkynetPrefix,
  walkDirectory,
  trimSiaPrefix,
};
