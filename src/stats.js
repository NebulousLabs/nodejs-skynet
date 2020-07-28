/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetStatsOptions = {
  ...defaultOptions("/skynet/stats"),
};

function getStats(customOptions = {}) {
  const opts = { ...defaultGetStatsOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = {
  getStats,
};
