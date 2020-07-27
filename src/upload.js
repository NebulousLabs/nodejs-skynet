"use strict";

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const p = require("path");

const { defaultOptions, makeUrl, walkDirectory, uriSkynetPrefix } = require("./utils");

const defaultUploadOptions = {
  ...defaultOptions("/skynet/skyfile"),
  portalFileFieldname: "file",
  portalDirectoryFileFieldname: "files[]",
  customFilename: "",
  // TODO:
  // customDirname: "",
  dryRun: false,
};

function uploadFile(path, customOptions = {}) {
  const opts = { ...defaultUploadOptions, ...customOptions };

  const formData = new FormData();
  const options = opts.customFilename ? { filename: opts.customFilename } : {};
  formData.append(opts.portalFileFieldname, fs.createReadStream(path), options);

  // Form the URL.
  const url = makeUrl(opts.portalUrl, opts.endpointPath);
  const params = {};
  if (opts.dryRun) params.dryrun = true;

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, { headers: formData.getHeaders(), params: params })
      .then((response) => {
        resolve(`${uriSkynetPrefix}${response.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function uploadDirectory(path, customOptions = {}) {
  const opts = { ...defaultUploadOptions, ...customOptions };

  // Check if there is a directory at given path.
  const stat = fs.statSync(path);
  if (!stat.isDirectory()) {
    throw new Error(`Given path is not a directory: ${path}`);
  }

  const formData = new FormData();
  path = p.normalize(path);
  let basepath = path;
  if (basepath != "/") {
    basepath += "/";
  }
  basepath = p.normalize(basepath);

  for (const file of walkDirectory(path)) {
    formData.append(opts.portalDirectoryFileFieldname, fs.createReadStream(file), {
      filepath: file.replace(basepath, ""),
    });
  }

  // Form the URL.
  const url = makeUrl(opts.portalUrl, opts.endpointPath);
  const params = { filename: opts.customFilename || path };

  if (opts.dryRun) params.dryrun = true;

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, { headers: formData.getHeaders(), params: params })
      .then((response) => {
        resolve(`${uriSkynetPrefix}${response.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { uploadFile, uploadDirectory };
