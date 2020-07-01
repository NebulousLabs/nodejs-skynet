"use strict";

const config = {
  DefaultUploadOptions: {
    portalUrl: "https://siasky.net",
    portalUploadPath: "/skynet/skyfile",
    portalFileFieldname: "file",
    portalDirectoryFileFieldname: "files[]",
    customFilename: "",
    removeBaseDir: false,
  },
  DefaultDownloadOptions: {
    portalUrl: "https://siasky.net",
  },
};

module.exports = config;
