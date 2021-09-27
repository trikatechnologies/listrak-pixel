# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.2] - 2021-09-27

### Added

- App store metadata

## [2.0.1] - 2021-08-23

### Added

- Crowdin file

## [2.0.0] - 2021-06-22

### Added

- Send Sku/Order/Product data to Listrak API

## [1.3.0] - 2021-03-18

### Added

- Configuration to separate abandonment and newsletter subscription events

## [1.2.0] - 2021-03-08

### Added

- `newsletterInput` Pixel event to handle newsletter input.

## [1.1.1] - 2020-08-31

### Changed

- Update docs

### Fixed

- Report price in dollars for cart changed events instead of in cents
- Send data to Listrak only after Listrak SDK reaches ready state

## [1.1.0] - 2020-06-16

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
