"use strict";

const axios = require("axios");
const fs = require("fs");

const { trimTrailingSlash, trimSiaPrefix } = require("./utils");

const DefaultDownloadOptions = {
  portalUrl: "https://siasky.net",
};

function DownloadFile(path, skylink, customOptions = {}) {
  const opts = { ...DefaultDownloadOptions, ...customOptions };

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

module.exports = { DefaultDownloadOptions, DownloadFile };
