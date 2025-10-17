# NHS.UK Eleventy Plugin • [![test](https://github.com/x-govuk/nhsuk-eleventy-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/x-govuk/nhsuk-eleventy-plugin/actions/workflows/test.yml)

Build documentation websites using Markdown and NHS.UK styles.

## Requirements

- [Node.js](https://nodejs.org) v22 or later
- [Eleventy](https://www.11ty.dev) v3 or later

## Installation

`npm install @x-govuk/nhsuk-eleventy-plugin`

## Usage

```js
import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    // Options
  })
}
```

Learn more about how to [get started](https://x-govuk.github.io/nhsuk-eleventy-plugin/get-started/) and which [options you can provide](https://x-govuk.github.io/nhsuk-eleventy-plugin/get-started/options/).

## Releasing a new version

`npm run release`

This command will ask you what version you want to use. It will then publish a new version on NPM, create and push a new git tag and then generate release notes ready for posting on GitHub.

> [!NOTE]
> Releasing a new version requires permission to publish packages to the `@x-govuk` organisation.
