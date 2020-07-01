"use strict";

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const p = require("path");

const { walkDirectory, trimTrailingSlash } = require("./utils");

function UploadFile(path, opts) {
  const options = opts.customFilename ? { filename: opts.customFilename } : {};

  const formData = new FormData();
  formData.append(opts.portalFileFieldname, fs.createReadStream(path), options);

  const url = `${trimTrailingSlash(opts.portalUrl)}${trimTrailingSlash(opts.portalUploadPath)}`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, { headers: formData.getHeaders() })
      .then((resp) => {
        resolve(`sia://${resp.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function UploadDirectory(path, opts) {
  const stat = fs.statSync(path);
  if (!stat.isDirectory()) {
    throw new Error(`Given path is not a directory: ${path}`);
  }

  const formData = new FormData();
  path = p.normalize(path);
  for (const file of walkDirectory(path)) {
    let filepath = file;
    if (opts.removeBaseDir) filepath = file.replace(path, "");
    formData.append(opts.portalDirectoryFileFieldname, fs.createReadStream(file), { filepath });
  }

  const url = `${trimTrailingSlash(opts.portalUrl)}${trimTrailingSlash(opts.portalUploadPath)}?filename=${
    opts.customFilename || path
  }`;

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, { headers: formData.getHeaders() })
      .then((resp) => {
        resolve(`sia://${resp.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { UploadFile, UploadDirectory };
