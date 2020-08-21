/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultLsOptions = {
  ...defaultOptions(""),
  endpointPathLsDir: "/renter/dir",
  endpointPathLsFile: "/renter/file",
};

SkynetClient.prototype.ls = function (customOptions = {}) {
  const opts = { ...defaultLsOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
