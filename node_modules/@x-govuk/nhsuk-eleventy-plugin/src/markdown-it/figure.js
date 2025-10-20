/**
 * Render a figure
 *
 * @param {Function} md - markdown-it instance
 */
export function figureRules(md) {
  const { rules } = md.renderer

  rules.figure_open = () => '<figure class="nhsuk-image">\n'

  rules.figcaption_open = () => '<figcaption class="nhsuk-image__caption">\n'
}
