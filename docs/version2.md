---
layout: post
title: Version 2
description: Creating taxonomies and tags
includeInBreadcrumbs: true
date: 2026-01-16
author: WGLL delivery team at SCW
---
## Tagging blueprints to success measures
Blueprints were set up as ACF custom post types, with a custom field group to handle their 12 metadata fields. The team set up a custom hierarchical taxonomy for the seven pillars and their success measures. Next, the team created a custom plugin to list any blueprints that:

* Lists related 'blueprint' posts that share any 'pillar' terms with the current post
* Provides a shortcode and a server-rendered dynamic block
* Outputs an NHS.UK-styled table with a link to the blueprint page and its description

MS CoPilot was used to help write the php code because the team wanted query parameters in the shortcode to help determine how the table was sorted and what was displayed, and this needed some js and json:

```
/**
 * Plugin Name: NHSUK Related Blueprints by Pillar (MU)
 * Description: Lists related 'blueprint' posts that share any 'pillar' terms with the current post. Provides a shortcode and a server-rendered dynamic block. Outputs an NHS.UK-styled table.
 * Author: SCW CSU
 * Version: 1.0.0
 *
 * ------------------------------------------------------------
 * QUICK START
 * ------------------------------------------------------------
 * Shortcode (best for single pages / classic templates):
 *   [nhsuk_blueprints_by_pillar acf_field="description" limit="0" orderby="title" order="ASC" columns="title,description"]
 *
 * Dynamic block (reliable in Query Loops; place inside Post Template):
 *   <!-- wp:scw/nhsuk-blueprints-by-pillar /-->
 *   <!-- wp:scw/nhsuk-blueprints-by-pillar {"limit":5,"columns":["title"]} /-->
 *
 * Attributes / params:
 *   - acf_field      : ACF field name for the description column (default 'description')
 *   - limit          : Max rows (0 = no limit)
 *   - orderby        : 'title'|'date'|'modified'|'menu_order' (default 'title')
 *   - order          : 'ASC'|'DESC' (default 'ASC')
 *   - columns        : any of ['title','description'] (default both)
 *   - empty_message  : message when nothing matches (default provided)
 *
 * Filters:
 *   - nhsuk_blueprints_cpt            : Change CPT slug (default 'blueprint')
 *   - nhsuk_blueprints_taxonomy       : Change taxonomy key (default 'pillar')
 *   - nhsuk_blueprints_table_caption  : Change table caption text (default 'Related blueprints')
 *   - nhsuk_blueprints_cache_ttl      : Change cache TTL seconds (default 60)
 */

if (!defined('ABSPATH')) { exit; }

// -----------------------------
// Config: CPT & taxonomy (filterable)
// -----------------------------
if (!defined('NHSUK_BLUEPRINT_CPT')) {
    define('NHSUK_BLUEPRINT_CPT', apply_filters('nhsuk_blueprints_cpt', 'blueprint'));
}
if (!defined('NHSUK_PILLARS_TAX')) {
    // If the main tags plugin isn't present, use a sensible default
    define('NHSUK_PILLARS_TAX', apply_filters('nhsuk_blueprints_taxonomy', 'pillar'));
}

// Ensure pillar taxonomy is attached to the blueprint CPT (runtime safety)
add_action('init', function () {
    $tax = apply_filters('nhsuk_blueprints_taxonomy', NHSUK_PILLARS_TAX);
    $cpt = apply_filters('nhsuk_blueprints_cpt', NHSUK_BLUEPRINT_CPT);
    if (taxonomy_exists($tax) && post_type_exists($cpt)) {
        register_taxonomy_for_object_type($tax, $cpt);
    }
}, 20);

```
*Code excerpt for the custom plugin.*

The plugin saved time because all the team had to do was ensure that both success measure and blueprint were tagged to the same taxonomy item.

[Return to homepage](/)
