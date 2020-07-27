/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetStatsOptions = {
  ...defaultOptions,
};

function getStats(customOptions = {}) {
  const opts = { ...defaultGetStatsOptions, ...customOptions };
}

module.exports = {
  getStats,
};
