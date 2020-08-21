/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultPinOptions = {
  ...defaultOptions("/skynet/pin"),
};

const defaultUnpinOptions = {
  ...defaultOptions(""),
  endpointPathUnpinDir: "/renter/dir",
  endpointPathUnpinFile: "/renter/delete",
};

SkynetClient.prototype.pin = function (skylink, destSiaPath, customOptions = {}) {
  const opts = { ...defaultPinOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};

SkynetClient.prototype.unpin = function (siaPath, customOptions = {}) {
  const opts = { ...defaultPinOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
