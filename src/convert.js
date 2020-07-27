/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultConvertOptions = {
  ...defaultOptions,
};

function convert(srcSiaPath, destSiaPath, customOptions = {}) {
  const opts = { ...defaultConvertOptions, ...customOptions };
}

module.exports = {
  convert,
};
