"use strict";

const { DefaultUploadOptions, UploadFile, UploadDirectory } = require("./src/upload");
const { DefaultDownloadOptions, DownloadFile } = require("./src/download");
const { UriSkynetPrefix } = require("./src/utils");

module.exports = {
  DefaultDownloadOptions,
  DefaultUploadOptions,
  DownloadFile,
  UploadDirectory,
  UploadFile,
  UriSkynetPrefix,
};
