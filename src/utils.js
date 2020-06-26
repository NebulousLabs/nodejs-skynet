"use strict";

const p = require("path");
const fs = require("fs");

const uriSkynetPrefix = "sia://";

function walkDirectory(path, out) {
  let files = [];
  if (!fs.existsSync(path)) {
    return files;
  }

  for (const subpath of fs.readdirSync(path)) {
    const fullpath = p.join(path, subpath);
    if (fs.statSync(fullpath).isDirectory()) {
      files = files.concat(walkDirectory(fullpath, out));
      continue;
    }
    files.push(fullpath);
  }
  return files;
}

function trimSiaPrefix(str) {
  return str.replace(uriSkynetPrefix, "");
}

function trimTrailingSlash(str) {
  return str.replace(/\/$/, "");
}

module.exports = { uriSkynetPrefix, walkDirectory, trimSiaPrefix, trimTrailingSlash };
