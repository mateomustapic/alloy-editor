# Alloy Editor

Alloy Editor is a modern WYSIWYG editor built on top of CKEditor, designed to create modern and gorgeous web content.

Works on IE9+, Chrome, Firefox and Safari.

## Demo

-   [Embedded self-guided demo](http://alloyeditor.com)
-   [Screencasts and code samples for specific features](https://alloyeditor.com/docs/features/)

## Features

-   Smart toolbars appear right near the selected text and offer different functionality based on context
-   Easily add your own buttons (see the "marquee" example in [the docs](https://alloyeditor.com/docs/develop/create/create_buttons.html))
-   Paste images from clipboard, or Drag&Drop them from another application
-   Insert images from the device's camera!
-   Paste rich text from any web page and preserve its formatting
-   The full styling power of CKEditor...
-   ...with a much more modern UI
-   The core is fully separated from the UI
-   The example UI is built with React
-   Plugin architecture

## Updating AlloyEditor in [liferay-portal](https://github.com/liferay/liferay-portal)

To update AlloyEditor in liferay-portal:

1. Navigate to the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
2. Update the `alloyeditor` dependency in the `package.json` file
3. Re-deploy the module with `gradlew clean deploy`.

An example can be seen in [this](https://github.com/liferay/alloy-editor/commit/0525c86b6d09c85b720ceaf52807f7a96feaeb2b#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) commit ([`package.json`](https://github.com/liferay/alloy-editor/blob/0525c86b6d09c85b720ceaf52807f7a96feaeb2b/package.json) file)



## Testing AlloyEditor in [liferay-portal](https://github.com/liferay/liferay-portal)

Update AlloyEditor

1. Install global dependencies: `npm install`
2. Make local changes
3. Build a new release of AlloyEditor: `yarn build`
4. Link new release: `yarn link`

Update AlloyEditor in liferay-portal:

1. Navigate to the [frontend-editor-alloyeditor-web](https://github.com/liferay/liferay-portal/tree/master/modules/apps/frontend-editor/frontend-editor-alloyeditor-web) module
2. Update the `alloyeditor` dependency in the `package.json` file or run `yarn add $PATH_TO_YOUR_LOCAL_ALLOY_EDITOR_REPO`
3. Link latest alloyeditor: `yarn link alloyeditor`
4. Remove the build, and classes directories `rm -rf build classes node_modules`
5. Re-deploy the module: `gradlew deploy`.

## Documentation

Look for documentation and examples on [http://alloyeditor.com/](http://alloyeditor.com/)

### License

[LGPL License](LICENSE.md)

[![Build Status](https://travis-ci.org/liferay/alloy-editor.svg)](https://travis-ci.org/liferay/alloy-editor)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/alloy-editor.svg)](https://saucelabs.com/u/alloy-editor)
