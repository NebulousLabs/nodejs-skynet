/* eslint-disable no-unused-vars */

"use strict";

const fs = require("fs");

const { defaultOptions, trimSiaPrefix } = require("./utils");
const { SkynetClient } = require("./client");

const defaultDownloadOptions = {
  ...defaultOptions("/"),
};

const defaultMetadataOptions = {
  ...defaultOptions("/"),
};

SkynetClient.prototype.downloadFile = function (path, skylink, customOptions = {}) {
  const opts = { ...defaultDownloadOptions, ...this.customOptions, ...customOptions };

  skylink = trimSiaPrefix(skylink);

  const writer = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    this.executeRequest({
      ...opts,
      method: "get",
      extraPath: skylink,
      responseType: "stream",
    })
      .then((response) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

SkynetClient.prototype.metadata = function (skylink, customOptions = {}) {
  const opts = { ...defaultMetadataOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
