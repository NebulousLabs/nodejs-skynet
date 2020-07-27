/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultLsOptions = {
  ...defaultOptions,
};

function ls(customOptions = {}) {
  const opts = { ...defaultLsOptions, ...customOptions };
}

module.exports = {
  ls,
};
