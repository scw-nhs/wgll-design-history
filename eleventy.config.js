import process from 'node:process'

import { nhsukEleventyPlugin } from '@x-govuk/nhsuk-eleventy-plugin'

export default function(eleventyConfig) {
  // Register the plugin
  eleventyConfig.addPlugin(nhsukEleventyPlugin, {
    header: {
      service: {
        text: 'WGLL design history'
      },
		}
	})

  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
		pathPrefix: process.env.GITHUB_ACTIONS ? '/wgll-design-history/' : '/',
    dir: {
      // The folder where all your content will live:
      input: 'docs',
	    // The folder where all your content will live:
			output: '_site',
    }
  }
};