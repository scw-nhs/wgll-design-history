import { currentPage as getCurrentPage } from '@x-govuk/govuk-eleventy-plugin/filters'

/**
 * Indicate which is the current item in header navigation items
 *
 * @param {object} header - Header options
 * @param {string} pageUrl - URL of current page
 * @returns {Array} Header items
 */
export function currentPage(header, pageUrl) {
  if (!header?.navigation?.items) {
    return header
  }

  header.navigation.items = getCurrentPage(header.navigation.items, pageUrl)

  return header
}
