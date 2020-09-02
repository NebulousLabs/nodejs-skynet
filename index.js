"use strict";

const { SkynetClient } = require("./src/client");
const { defaultOptions, defaultSkynetPortalUrl, defaultPortalUrl, uriSkynetPrefix } = require("./src/utils");

module.exports = {
  SkynetClient,

  defaultOptions,
  defaultPortalUrl,
  defaultSkynetPortalUrl,
  uriSkynetPrefix,
};
