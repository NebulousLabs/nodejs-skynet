"use strict";

const axios = require("axios");
const fs = require("fs");

const { trimTrailingSlash, trimSiaPrefix } = require("./utils");

const DefaultDownloadOptions = fillWithDefaultDownloadOptions();

function fillWithDefaultDownloadOptions(opts = {}) {
  if (!("portalUrl" in opts)) {
    opts.portalUrl = "https://siasky.net";
  }

  return opts;
}

function DownloadFile(path, skylink, opts = {}) {
  opts = fillWithDefaultDownloadOptions(opts);

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
