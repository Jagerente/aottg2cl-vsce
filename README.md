# AoTTG 2 Custom Logic VSCode Extension

This is a VSCode extension providing  syntax highlighting and autocomplete features for AoTTG 2 Custom Logic.

While this is a super early version of the extension, it already should significantly improve the comfort of writing scripts.

## Usage

> Script files must be ended with `.acl` extension.

### VSCode Extensions Hub

1. Open VSCode and go to the Extensions view (you can press `Ctrl + Shift + X`).
2. Search for `AoTTG 2 Custom Logic` and install it.

### Manual installation

1. Download latest `aottg2cl-*.vsix` package.
2. Open VSCode and go to the Extensions view (you can press `Ctrl + Shift + X`)
3. Click on the three-dot menu (`...`) in the top-right corner of the Extensions view.
4. Select `Install from VSIX...`
5. Choose the `.vsix` file you downloaded in the first step.

## Build

```sh
npm install -g vsce
npm i
vsce package
```
