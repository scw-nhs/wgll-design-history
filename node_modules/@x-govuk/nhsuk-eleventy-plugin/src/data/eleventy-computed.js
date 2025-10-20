import {
  getNavigationKey,
  getNavigationParent
} from '@x-govuk/govuk-eleventy-plugin/utils'

/**
 * Set sensible defaults for eleventyNavigation
 *
 * @see {@link https://www.11ty.dev/docs/plugins/navigation/}
 */
export const eleventyComputed = {
  eleventyNavigation: {
    key: (data) => getNavigationKey(data),
    parent: (data) => getNavigationParent(data),
    excerpt: (data) => data.eleventyNavigation.excerpt || data.description
  }
}
