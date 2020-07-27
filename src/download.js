"use strict";

const axios = require("axios");
const fs = require("fs");

const { defaultOptions, makeUrl, trimSiaPrefix } = require("./utils");

const defaultDownloadOptions = {
  ...defaultOptions("/"),
};

function downloadFile(path, skylink, customOptions = {}) {
  const opts = { ...defaultDownloadOptions, ...customOptions };

  skylink = trimSiaPrefix(skylink);
  let url = makeUrl(opts.portalUrl, opts.endpointPath, skylink);

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

module.exports = { downloadFile };
