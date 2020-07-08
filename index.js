"use strict";

const { defaultUploadOptions, uploadFile, uploadDirectory } = require("./src/upload");
const { defaultDownloadOptions, downloadFile } = require("./src/download");
const { uriSkynetPrefix } = require("./src/utils");

module.exports = {
  defaultDownloadOptions,
  defaultUploadOptions,
  downloadFile,
  uploadDirectory,
  uploadFile,
  uriSkynetPrefix,
};
