/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultPinOptions = {
  ...defaultOptions("/skynet/pin"),
};

const defaultUnpinOptions = {
  ...defaultOptions(""),
  endpointPathUnpinDir: "/renter/dir",
  endpointPathUnpinFile: "/renter/delete",
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
