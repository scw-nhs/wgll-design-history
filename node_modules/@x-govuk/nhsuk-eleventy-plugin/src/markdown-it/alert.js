/**
 * Render a GitHub-style alert
 *
 * @param {Function} md - markdown-it instance
 */
export function alertRules(md) {
  const { rules } = md.renderer

  rules.alert_open = function (tokens, idx) {
    const { title, type } = tokens[idx].meta

    const visuallyHiddenTitle = type.charAt(0).toUpperCase() + type.slice(1)
    const hasCustomTitle = title !== visuallyHiddenTitle

    if (['caution', 'important', 'warning'].includes(type)) {
      let html = `<div class="nhsuk-warning-callout app-warning-callout--${type}">`

      // Warning callout always shows a heading, either a custom title,
      // else the type of alert
      html += hasCustomTitle
        ? `<h3 class="nhsuk-warning-callout__label"><span class="nhsuk-u-visually-hidden">${visuallyHiddenTitle}: </span>${title}</h3>`
        : `<h3 class="nhsuk-warning-callout__label">${visuallyHiddenTitle}</h3>`

      return html
    }

    let html = `<div class="nhsuk-inset-text app-inset-text--${type}">`

    // Inset text only shows a heading if there is a custom title
    html += hasCustomTitle
      ? `<h3 class="nhsuk-heading-m"><span class="nhsuk-u-visually-hidden">${visuallyHiddenTitle}: </span>${title}</h3>`
      : `<span class="nhsuk-u-visually-hidden">${visuallyHiddenTitle}: </span>`

    return html
  }
}
