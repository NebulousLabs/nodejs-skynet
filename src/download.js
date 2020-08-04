/* eslint-disable no-unused-vars */

"use strict";

const fs = require("fs");

const { defaultOptions, executeRequest, trimSiaPrefix } = require("./utils");

const defaultDownloadOptions = {
  ...defaultOptions("/"),
};

const defaultMetadataOptions = {
  ...defaultOptions("/"),
};

function downloadFile(path, skylink, customOptions = {}) {
  const opts = { ...defaultDownloadOptions, ...customOptions };

  skylink = trimSiaPrefix(skylink);

  const writer = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    executeRequest({
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
}

function metadata(skylink, customOptions = {}) {
  const opts = { ...defaultMetadataOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = { downloadFile, metadata };
