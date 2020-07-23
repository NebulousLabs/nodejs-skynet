"use strict";

const axios = require("axios");
const fs = require("fs");

const { defaultOptions, trimTrailingSlash, trimSiaPrefix } = require("./utils");

const defaultDownloadOptions = {
  ...defaultOptions,
  endpointPath: "/",
};

function downloadFile(path, skylink, customOptions = {}) {
  const opts = { ...defaultDownloadOptions, ...customOptions };

  const url = `${trimTrailingSlash(opts.portalUrl)}/${trimSiaPrefix(skylink)}`;

  const writer = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: "stream" })
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

module.exports = { defaultDownloadOptions, downloadFile };
