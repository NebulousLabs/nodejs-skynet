"use strict";

const { SkynetClient } = require("./src/client");
const { defaultOptions, defaultSkynetPortalUrl, defaultPortalUrl, uriSkynetPrefix } = require("./src/utils");

// Get the following files to run or the client's methods won't be defined.
require("./src/blocklist.js");
require("./src/convert.js");
require("./src/download.js");
require("./src/encryption.js");
require("./src/list.js");
require("./src/pin.js");
require("./src/portals.js");
require("./src/stats.js");
require("./src/upload.js");

module.exports = {
  SkynetClient,

  defaultOptions,
  defaultPortalUrl,
  defaultSkynetPortalUrl,
  uriSkynetPrefix,
};
