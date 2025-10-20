import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'

export default function(eleventyConfig) {
  // Register the plugin
  eleventyConfig.addPlugin(nhsukEleventyPlugin)

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
		pathPrefix: "/wgll-design-history",
    dir: {
      // The folder where all your content will live:
      input: 'docs',
    }
  }
};