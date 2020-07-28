/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetBlocklistOptions = {
  ...defaultOptions("/skynet/blocklist"),
};

const defaultUpdateBlocklistOptions = {
  ...defaultOptions("/skynet/blocklist"),
};

function getBlocklist(customOptions = {}) {
  const opts = { ...defaultGetBlocklistOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function updateBlocklist(customOptions = {}) {
  const opts = { ...defaultUpdateBlocklistOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = {
  getBlocklist,
  updateBlocklist,
};
