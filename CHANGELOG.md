# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- App settings for On-Site Recommendations are now loaded from props

### Fixed

- On-Site Recommendations now includes AddSku() Listrak SDK call

## [1.0.3] - 2020-04-20

### Added

- For pixel events: Added functions to get appropriate product ID depending on app setting

### Fixed

- App settings are now properly saved as window variables: `listrak_email_ids` string is decoded before splitting by comma, `listrak_useRefIdSetting` is cast to a boolean

- `OnSiteRecommendations` component now checks for existence of `_ltk` object before rendering widget

## [1.0.2] - 2020-04-01

### Added

- Added product reference id option to all relevant event tracking

## [1.0.1] - 2020-02-26

### Added

- Updated docs to include instructions for adding Listrak app as a dependency of the store-theme

## [1.0.0] - 2020-02-26

### Removed

- Removed billing options from manifest

## [0.0.2] - 2020-02-10

### Fixed

- Check to make sure Listrak script is loaded before activating event listener

## [0.0.1] - 2020-01-31

### Added

- Initial release
