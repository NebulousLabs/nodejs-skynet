"use strict";

const { DefaultUploadOptions, DefaultDownloadOptions } = require("./config");
const { UploadFile, UploadDirectory } = require("./src/upload");
const { DownloadFile } = require("./src/download");

module.exports = {
  DefaultUploadOptions: DefaultUploadOptions,
  DefaultDownloadOptions: DefaultDownloadOptions,
  UploadFile: UploadFile,
  UploadDirectory: UploadDirectory,
  DownloadFile: DownloadFile
};
