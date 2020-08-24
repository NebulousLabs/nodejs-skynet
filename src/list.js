/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultListFilesOptions = {
  ...defaultOptions(""),
  endpointPathListFilesDir: "/renter/dir",
  endpointPathListFilesFile: "/renter/file",
};

SkynetClient.prototype.listFiles = function (customOptions = {}) {
  const opts = { ...defaultListFilesOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
