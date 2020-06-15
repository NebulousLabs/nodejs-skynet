"use strict";

const axios = require("axios");
const fs = require("fs");

const { trimTrailingSlash, trimSiaPrefix } = require("./utils");

export function DownloadFile(path, skylink, opts) {
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
