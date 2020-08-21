/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");
const { SkynetClient } = require("./client");

const defaultGetStatsOptions = {
  ...defaultOptions("/skynet/stats"),
};

SkynetClient.prototype.getStats = function (customOptions = {}) {
  const opts = { ...defaultGetStatsOptions, ...this.customOptions, ...customOptions };

  throw new Error("Unimplemented");
};
