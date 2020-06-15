"use strict";

const p = require("path");
const fs = require("fs");

export function walkDirectory(path, out) {
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

export function trimSiaPrefix(str) {
  return str.replace("sia://", "");
}

export function trimTrailingSlash(str) {
  return str.replace(/\/$/, "");
}
