/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultGetBlocklistOptions = {
  ...defaultOptions("/skynet/blocklist"),
};

const defaultUpdateBlocklistOptions = {
  ...defaultOptions("/skynet/blocklist"),
};

SkynetClient.prototype.getBlocklist = function (customOptions = {}) {
  const opts = { ...defaultGetBlocklistOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.updateBlocklist = function (customOptions = {}) {
  const opts = { ...defaultUpdateBlocklistOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
