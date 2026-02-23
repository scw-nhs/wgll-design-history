---
layout: post
title: Version 3
description: Creating a modular structure
includeInBreadcrumbs: true
date: 2025-12-19
author: WGLL delivery team at SCW
---
## WGLL's current content
User research demonstrated strong support for WGLL's seven pillars. They were described as 'familiar' and 'simple', serving as an anchor for conversations about digital strategies and priorities. 

> “[structuring my business case around WGLL] allowed me to make a successful case for investment.” - Trust CDIO

Research found that the pillars are often used to guide organisational restructures and help reposition digital and data as a central enabler, rather than just IT:

> "[WGLL] helped us move from simply seeing Digital as IT, to seeing Digital as a transformation enabler ... it helped elevate thinking of digital and data as more than just widgets." - Digital Director

However, users said they needed more detail beneath each pillar - how each pillar and its success measures mapped across to Digital Maturity Assessment questions and resources, plus roles and responsibilities. This was hard to do with the existing long-form document format.

## Breaking content down into modules
The team broke down the long-form WGLL into a hierarchical structure:

* L0 - WGLL (homepage)
* L1 - Pillar (page)
* L2 - Success measure (sub page)
* L3 - Metric (taxonomy)

L2 success measures under each pillar are unique content items, whereas metrics may be used by more than one success measure. Initially the team looked at creating a custom post type using ACF for each success measure. However, this wasn't needed as pages and sub pages work just fine.

## Tabs or menu items?
The Wordpress Nightingale template has a tabbed menu - essentially a submenu which looks like tabs. The team tried this out, with an overarching index page for WGLL listing the 7 pillars. It seemed to work well although the team wasn't sure if this component was still in the NHS design system or if it had been deprecated. If the latter, the team could use the top menu instead.

![WGLL Pillars as Tabs](/assets/images/wgll-pillars-as-tabs.png "Tabbed pillars")

The main index page had a link to each pillar, then each pillar acted as an index page for its success measures - sub pages that feature consistent content:

1. H2 menu (NHS Nightingale block)
2. What good looks like - text statements with bullets where appropriate
3. Success measures - NHS styled table with individual success measures and how they are measured
4. Blueprints - examples of good practice tagged to this success measure

[Return to homepage](/)
