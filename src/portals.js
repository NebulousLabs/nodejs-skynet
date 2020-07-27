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
}

function updatePortals(customOptions = {}) {
  const opts = { ...defaultUpdatePortalsOptions, ...customOptions };
}

module.exports = {
  getPortals,
  updatePortals,
};
