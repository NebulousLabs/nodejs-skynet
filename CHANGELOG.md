# Changelog

## [2.0.0]

### Added

- `customDirname` upload option

### Changed

- This SDK has been updated to match Browser JS and require a client. You will
  first need to create a client and then make all API calls from this client.
- Connection options can now be passed to the client, in addition to individual
  API calls, to be applied to all API calls.
- The `defaultPortalUrl` string has been renamed to `defaultSkynetPortalUrl` and
  `defaultPortalUrl` is now a function.

## [1.1.0]

### Added

- Common Options object
- API authentication
- `dryRun` option

### Changed

- Some upload bugs were fixed.

## [1.0.0]

### Added

- Upload and download functionality.
