/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultPinOptions = {
  ...defaultOptions,
};

const defaultUnpinOptions = {
  ...defaultOptions,
};

function pin(skylink, destSiaPath, customOptions = {}) {
  const opts = { ...defaultPinOptions, ...customOptions };
}

function unpin(siaPath, customOptions = {}) {
  const opts = { ...defaultPinOptions, ...customOptions };
}

module.exports = {
  pin,
  unpin,
};
