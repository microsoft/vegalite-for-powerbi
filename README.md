# PowerBi Custom Visual in Vega-Lite

## Install

First install necessary dependencies with `npm install`.
Then run `npm run cert` and follow the instructions at https://github.com/Microsoft/PowerBI-visuals/blob/master/tools/CertificateAddOSX.md.

## Run

Run `npm start` in a terminal.

The open PowerBI with developer mode enabled and create a developer visual.

## Update Vega

`cp node_modules/vega/build/vega.js libs/vega.js` then replace the access to `window.devicePixelRatio` with a constant.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
