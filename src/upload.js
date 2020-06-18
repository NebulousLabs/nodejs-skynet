"use strict";

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const { walkDirectory, trimTrailingSlash } = require("./utils");

const DefaultUploadOptions = fillWithDefaultUploadOptions();

function fillWithDefaultUploadOptions(opts = {}) {
  if (!("portalUrl" in opts)) {
    opts.portalUrl = "https://siasky.net";
  }
  if (!("portalUploadPath" in opts)) {
    opts.portalUploadPath = "/skynet/skyfile";
  }
  if (!("portalFileFieldname" in opts)) {
    opts.portalFileFieldname = "file";
  }
  if (!("portalDirectoryFileFieldname" in opts)) {
    opts.portalDirectoryFileFieldname = "files[]";
  }
  if (!("customFilename" in opts)) {
    opts.customFilename = "";
  }

  return opts;
}

function UploadFile(path, opts = {}) {
  opts = fillWithDefaultUploadOptions(opts);

  const formData = new FormData();
  const options = opts.customFilename ? { filename: opts.customFilename } : {};
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

function UploadDirectory(path, opts = {}) {
  opts = fillWithDefaultUploadOptions(opts);

  const stat = fs.statSync(path);
  if (!stat.isDirectory()) {
    throw new Error(`Given path is not a directory: ${path}`);
  }

  const formData = new FormData();
  for (const file of walkDirectory(path)) {
    formData.append(opts.portalDirectoryFileFieldname, fs.createReadStream(file), { filepath: file });
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

module.exports = { DefaultUploadOptions, UploadFile, UploadDirectory };
