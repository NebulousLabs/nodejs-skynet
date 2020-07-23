/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetBlocklistOptions = {
  ...defaultOptions,
};

const defaultUpdateBlocklistOptions = {
  ...defaultOptions,
};

function getBlocklist(customOptions = {}) {
  const opts = { ...defaultGetBlocklistOptions, ...customOptions };
}

function updateBlocklist(customOptions = {}) {
  const opts = { ...defaultUpdateBlocklistOptions, ...customOptions };
}

module.exports = {
  defaultGetBlocklistOptions,
  getBlocklist,

  defaultUpdateBlocklistOptions,
  updateBlocklist,
};
