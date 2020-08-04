"use strict";

const p = require("path");
const fs = require("fs");
const urljoin = require("url-join");

const defaultPortalUrl = "https://siasky.net";

const uriSkynetPrefix = "sia://";

function defaultOptions(endpointPath) {
  return {
    portalUrl: defaultPortalUrl,
    endpointPath: endpointPath,
    // TODO:
    // apiKey: "",
    // customUserAgent: "",
  };
}

/**
 * Properly joins paths together to create a URL.
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
  makeUrl,
  uriSkynetPrefix,
  walkDirectory,
  trimSiaPrefix,
};
