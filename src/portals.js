/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetPortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

const defaultUpdatePortalsOptions = {
  ...defaultOptions("/skynet/portals"),
};

function getPortals(customOptions = {}) {
  const opts = { ...defaultGetPortalsOptions, ...customOptions };

  throw new Error("Unimplemented");
}

function updatePortals(customOptions = {}) {
  const opts = { ...defaultUpdatePortalsOptions, ...customOptions };

  throw new Error("Unimplemented");
}

module.exports = {
  getPortals,
  updatePortals,
};
