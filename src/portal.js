/* eslint-disable no-unused-vars */

const { defaultOptions } = require("./utils");

const defaultGetPortalsOptions = {
  ...defaultOptions,
};

const defaultUpdatePortalsOptions = {
  ...defaultOptions,
};

function getPortals(customOptions = {}) {
  const opts = { ...defaultGetPortalsOptions, ...customOptions };
}

function updatePortals(customOptions = {}) {
  const opts = { ...defaultUpdatePortalsOptions, ...customOptions };
}

module.exports = {
  defaultGetPortalsOptions,
  getPortals,

  defaultUpdatePortalsOptions,
  updatePortals,
};
