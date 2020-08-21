/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultGetPortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

const defaultUpdatePortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

SkynetClient.prototype.getPortals = function (customOptions = {}) {
  const opts = { ...defaultGetPortalsOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.updatePortals = function (customOptions = {}) {
  const opts = { ...defaultUpdatePortalsOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
