"use strict";

const FormData = require("form-data");
const fs = require("fs");
const p = require("path");

const { defaultOptions, walkDirectory, uriSkynetPrefix } = require("./utils");
const { SkynetClient } = require("./client");

const defaultUploadOptions = {
  ...defaultOptions("/skynet/skyfile"),
  portalFileFieldname: "file",
  portalDirectoryFileFieldname: "files[]",
  customFilename: "",
  customDirname: "",
  dryRun: false,
};

SkynetClient.prototype.uploadFile = function (path, customOptions = {}) {
  const opts = { ...defaultUploadOptions, ...this.customOptions, ...customOptions };

  const formData = new FormData();
  const filename = opts.customFilename ? opts.customFilename : "";
  formData.append(opts.portalFileFieldname, fs.createReadStream(path), filename);

  const params = {};
  if (opts.dryRun) params.dryrun = true;

  return new Promise((resolve, reject) => {
    this.executeRequest({
      ...opts,
      method: "post",
      data: formData,
      headers: formData.getHeaders(),
      params: params,
    })
      .then((response) => {
        resolve(`${uriSkynetPrefix}${response.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

SkynetClient.prototype.uploadDirectory = function (path, customOptions = {}) {
  const opts = { ...defaultUploadOptions, ...this.customOptions, ...customOptions };

  // Check if there is a directory at given path.
  const stat = fs.statSync(path);
  if (!stat.isDirectory()) {
    throw new Error(`Given path is not a directory: ${path}`);
  }

  const formData = new FormData();
  path = p.normalize(path);
  let basepath = path;
  // Ensure the basepath ends in a slash.
  if (!basepath.endsWith("/")) {
    basepath += "/";
    // Normalize the slash on non-Unix filesystems.
    basepath = p.normalize(basepath);
  }

  for (const file of walkDirectory(path)) {
    // Remove the dir path from the start of the filename if it exists.
    let filename = file;
    if (file.startsWith(basepath)) {
      filename = file.replace(basepath, "");
    }
    formData.append(opts.portalDirectoryFileFieldname, fs.createReadStream(file), { filepath: filename });
  }

  let filename = opts.customDirname || path;
  if (filename.startsWith("/")) {
    filename = filename.slice(1);
  }
  const params = { filename };

  if (opts.dryRun) params.dryrun = true;

  return new Promise((resolve, reject) => {
    this.executeRequest({
      ...opts,
      method: "post",
      data: formData,
      headers: formData.getHeaders(),
      params: params,
    })
      .then((response) => {
        resolve(`${uriSkynetPrefix}${response.data.skylink}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
