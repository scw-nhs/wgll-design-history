import path from 'node:path'

import Nunjucks from 'nunjucks'

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`,
 * the `defaultValue` is returned in its place.
 *
 * @param {object} object - Object to query
 * @param {Array|string} keys - Path of the property to get
 * @param {*} defaultValue - Value returned for `undefined` resolved values
 * @returns {*} The resolved value
 */
function getProp(object, keys, defaultValue) {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  object = object[keys[0]]
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1))
  }
  return object === undefined ? defaultValue : object
}

/**
 * Configure Nunjucks environment
 *
 * @see {@link https://mozilla.github.io/nunjucks/api.html#environment}
 * @param {object} eleventyConfig - Eleventy config
 * @returns {Function} Nunjucks environment
 */
export function nunjucksConfig(eleventyConfig) {
  const { includes, input, layouts } = eleventyConfig.dir

  const searchPaths = [
    ...(includes ? [path.join(input, includes)] : []),
    ...(layouts ? [path.join(input, layouts)] : []),
    input,
    './node_modules/@x-govuk/nhsuk-eleventy-plugin/src',
    './node_modules/nhsuk-frontend/dist'
  ]

  /**
   * Set default options, but respect `nunjucksEnvironmentOptions`
   *
   * @see {@link https://www.11ty.dev/docs/languages/nunjucks/#optional-use-your-nunjucks-environment-options}
   */
  const options = {
    autoescape: false,
    lstripBlocks: true,
    trimBlocks: true,
    noCache: process.env === 'development',
    watch: process.env === 'development',
    ...eleventyConfig.nunjucksEnvironmentOptions
  }

  const nunjucks = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(searchPaths),
    options
  )

  nunjucks.addGlobal('getData', function (keyName) {
    return typeof keyName === 'string' ? getProp(this.ctx, keyName) : keyName
  })

  return nunjucks
}
