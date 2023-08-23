fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios merge_develop_into_master

```sh
[bundle exec] fastlane ios merge_develop_into_master
```

Create new Release Branch

### ios perform_version_change

```sh
[bundle exec] fastlane ios perform_version_change
```

Perform Version Change

### ios change_ios_version

```sh
[bundle exec] fastlane ios change_ios_version
```

Change iOS Version

### ios change_package_json_version

```sh
[bundle exec] fastlane ios change_package_json_version
```

Change package.json version

### ios nuke

```sh
[bundle exec] fastlane ios nuke
```

nuke new cert

### ios build_app_ios

```sh
[bundle exec] fastlane ios build_app_ios
```

Build iOS App

### ios release

```sh
[bundle exec] fastlane ios release
```

Build App iOS AppStore

### ios nukeall

```sh
[bundle exec] fastlane ios nukeall
```

Nuke All

### ios register

```sh
[bundle exec] fastlane ios register
```

Register new devices

### ios install_signing

```sh
[bundle exec] fastlane ios install_signing
```

Description of what the lane does

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
