/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetStatsOptions = {
  ...defaultOptions("/skynet/stats"),
};

function getStats(customOptions = {}) {
  const opts = { ...defaultGetStatsOptions, ...customOptions };
}

module.exports = {
  getStats,
};
