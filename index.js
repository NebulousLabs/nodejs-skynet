"use strict";

const { DefaultUploadOptions, uploadFile, uploadDirectory } = require("./src/upload");
const { DefaultDownloadOptions, downloadFile } = require("./src/download");
const { UriSkynetPrefix } = require("./src/utils");

module.exports = {
  DefaultDownloadOptions,
  DefaultUploadOptions,
  downloadFile,
  uploadDirectory,
  uploadFile,
  UriSkynetPrefix,
};
