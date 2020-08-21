/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultConvertOptions = {
  ...defaultOptions("/skynet/skyfile"),
};

SkynetClient.prototype.convert = function (srcSiaPath, destSiaPath, customOptions = {}) {
  const opts = { ...defaultConvertOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
