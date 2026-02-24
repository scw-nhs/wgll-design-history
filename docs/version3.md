---
layout: post
title: Version 3
description: Adding metrics to WGLL success measures
includeInBreadcrumbs: true
date: 2026-02-30
author: WGLL delivery team at SCW
---
## User research - why metrics are needed
Some users felt that WGLL needed to have 'teeth' - it should explicitly link to things that NHS organisations need to do in order to deliver on local and national priorities and policies. These are measured in a variety of ways - for example, digital maturity assessments, DSPT toolkits for cyber and so on. 

To ensure WGLL remains relevant and up-to-date, the team needed to make sure each success measure is actually measured. And, to make it easier for users, they needed to provide a direct link to the ways this is done - potentially up to 3 different ways.

## The challenge for content design
The breakdown of content into modules in the [first sprint](/version1/) identified that metrics might repeat across success measures. So the team created:

1. a custom ACF taxonomy with custom ACF field group for metrics
2. a plugin that automatically creates an NHS-styled table for metrics, called by a shortcode block: `[nhs_metrics_table]`

The team then created:

* [guidance on setting up the plugin](/nhs-metrics-plugin-guidance)
* [a working practice for content editors](/)

The working practice covers the process for adding metrics and blueprint references to WGLL success measure pages - the sub-pages beneath each of the seven pillars - within the WordPress admin interface. 

## Benefits of this approach
Using a taxonomy and field group with a custom plugin has three key benefits:

1. metrics can be reused, meaning they are easier to maintain than reviewing pages separately
2. it keeps WGLL v3 platform-agnostic, meaning the relationships are 'live' and can be exported
3. it saves time taken to create separate tables on each success measure page (and should improve consistency)

[Return to homepage](/)
