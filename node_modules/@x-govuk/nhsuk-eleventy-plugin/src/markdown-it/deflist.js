/**
 * Render a definition list
 *
 * @param {Function} md - markdown-it instance
 */
export function defListRules(md) {
  const { rules } = md.renderer

  rules.dl_open = () => '<dl class="nhsuk-body-m">\n'

  rules.dt_open = () =>
    '<dt class="nhsuk-u-font-weight-bold nhsuk-u-margin-bottom-2">\n'

  rules.dd_open = () =>
    '<dd class="nhsuk-u-margin-bottom-2 nhsuk-u-margin-left-4">\n'
}
