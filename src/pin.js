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

  throw new Error("Unimplemented");
}

function unpin(siaPath, customOptions = {}) {
  const opts = { ...defaultPinOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = {
  pin,
  unpin,
};
