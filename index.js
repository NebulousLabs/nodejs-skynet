"use strict";

const { defaultDownloadOptions, downloadFile } = require("./src/download");
const { defaultUploadOptions, uploadFile, uploadDirectory } = require("./src/upload");
const { defaultOptions, defaultPortalUrl, uriSkynetPrefix } = require("./src/utils");

module.exports = {
  /* TODO: Blocklist */

  defaultDownloadOptions,
  downloadFile,

  /* TODO: Encryption */

  /* TODO: Portals */

  /* TODO: Stats */

  defaultUploadOptions,
  uploadDirectory,
  uploadFile,

  defaultOptions,
  defaultPortalUrl,
  uriSkynetPrefix,
};
