import deepmerge from 'deepmerge'

/**
 * Default option values
 *
 * @see {@link https://x-govuk.github.io/nhsuk-eleventy-plugin/options/}
 */
const defaults = {
  homeKey: 'Home',
  icons: {
    mask: '/assets/images/nhsuk-icon-mask.svg',
    shortcut: '/assets/images/favicon.ico',
    touch: '/assets/images/nhsuk-icon-180.png'
  },
  markdown: {
    headingPermalinks: false,
    headingsStartWith: 'xl'
  },
  opengraphImageUrl: '/assets/images/nhsuk-opengraph-image.png',
  stylesheets: [],
  titleSuffix: 'NHS',
  url: false,
  templates: {
    error404: true,
    sitemap: true // Linked to from default 404 page
  }
}

export function defaultPluginOptions(options, pathPrefix) {
  options.pathPrefix = pathPrefix

  // Let `true` mean the default title suffix (`true` is rendered as a string)
  if (options.titleSuffix === true) {
    delete options.titleSuffix
  }

  if (options.templates?.searchIndex) {
    // Enable search in header
    if (options.header) {
      options.header.search = options.header?.search || true
    }

    // Add _searchIndexPath to enable search field to be initialised
    options._searchIndexPath =
      options.templates?.searchIndex?.permalink || '/search-index.json'
  }

  if (options.templates?.feed) {
    // Add _feedPath to enable feed to be linked to from page head
    options._feedPath = options.templates?.feed?.permalink || '/feed.xml'
  }

  // Show message if using deprecated headingPermalinks option
  if (options?.headingPermalinks) {
    console.warn(
      'The `headingPermalinks` option is deprecated and will be removed in a future version. Use `markdown.headingPermalinks` option instead.'
    )

    options.markdown = {
      headingPermalinks: options.headingPermalinks,
      ...options.markdown
    }
  }

  return deepmerge(defaults, options)
}
