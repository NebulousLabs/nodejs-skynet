"use strict";

const { SkynetClient } = require("./src/client");
const { defaultOptions, defaultSkynetPortalUrl, defaultPortalUrl, uriSkynetPrefix } = require("./src/utils");

// Get the following files to run or the client's methods won't be defined.
require("./src/download.js");
require("./src/upload.js");

module.exports = {
  SkynetClient,

  defaultOptions,
  defaultPortalUrl,
  defaultSkynetPortalUrl,
  uriSkynetPrefix,
};
