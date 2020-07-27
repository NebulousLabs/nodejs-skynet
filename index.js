"use strict";

const { downloadFile } = require("./src/download");
const { uploadFile, uploadDirectory } = require("./src/upload");
const { defaultOptions, defaultPortalUrl, uriSkynetPrefix } = require("./src/utils");

module.exports = {
  /* TODO: Blocklist */

  /* TODO: Convert */

  downloadFile,

  /* TODO: Encryption */

  /* TODO: Ls */

  /* TODO: Pin */

  /* TODO: Portals */

  /* TODO: Stats */

  uploadDirectory,
  uploadFile,

  defaultOptions,
  defaultPortalUrl,
  uriSkynetPrefix,
};
