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

<?php
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

/**
 * Core renderer: NHS-styled table of related blueprints by shared pillar terms.
 *
 * @param array $args {
 *   @type int    $post_id        Context post ID (default: current).
 *   @type string $acf_field      ACF field name used for description (default: 'description').
 *   @type int    $limit          Max items (0 = no limit).
 *   @type string $orderby        'title'|'date'|'modified'|'menu_order' (default: 'title').
 *   @type string $order          'ASC'|'DESC' (default: 'ASC').
 *   @type array  $columns        Which columns to show (any of: 'title','description'). Default both.
 *   @type string $empty_message  Message when no related blueprints (default provided).
 *   @type string $caption        Table caption (default filterable 'Related blueprints').
 * }
 * @return string HTML
 */
function nhsuk_render_blueprints_by_pillar($args = []) {
    $defaults = [
        'post_id'       => 0,
        'acf_field'     => 'description',
        'limit'         => 0,
        'orderby'       => 'title',
        'order'         => 'ASC',
        'columns'       => ['title','description'],
        'empty_message' => 'No related blueprints found.',
        'caption'       => apply_filters('nhsuk_blueprints_table_caption', 'Related blueprints'),
    ];
    $args = wp_parse_args($args, $defaults);

    $context_post_id = absint($args['post_id']) ?: get_the_ID();
    if (!$context_post_id) return '';

    $cache_ttl = absint(apply_filters('nhsuk_blueprints_cache_ttl', 60));
    $cache_key = 'nhsuk_blueprints_' . md5(serialize($args) . '|' . $context_post_id);
    $cached = wp_cache_get($cache_key, 'nhsuk-blueprints');
    if ($cached !== false) return $cached;

    $pillar_tax = apply_filters('nhsuk_blueprints_taxonomy', NHSUK_PILLARS_TAX);
    $blueprint_cpt = apply_filters('nhsuk_blueprints_cpt', NHSUK_BLUEPRINT_CPT);

    // Get pillar terms from context
    $pillar_terms = get_the_terms($context_post_id, $pillar_tax);
    if (empty($pillar_terms) || is_wp_error($pillar_terms)) {
        $html = '<div class="nhsuk-u-margin-top-3 nhsuk-u-secondary-text-color">' . esc_html($args['empty_message']) . '</div>';
        wp_cache_set($cache_key, $html, 'nhsuk-blueprints', $cache_ttl);
        return $html;
    }
    $pillar_ids = wp_list_pluck($pillar_terms, 'term_id');

    // Query blueprints that share ANY of the pillars
    $q_args = [
        'post_type'           => $blueprint_cpt,
        'post_status'         => 'publish',
        'posts_per_page'      => ($args['limit'] ? absint($args['limit']) : -1),
        'orderby'             => sanitize_key($args['orderby']),
        'order'               => (strtoupper($args['order']) === 'DESC' ? 'DESC' : 'ASC'),
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
        'tax_query'           => [
            [
                'taxonomy' => $pillar_tax,
                'field'    => 'term_id',
                'terms'    => $pillar_ids,
                'operator' => 'IN',
            ],
        ],
    ];

    // Exclude context if it is itself a blueprint
    if (get_post_type($context_post_id) === $blueprint_cpt) {
        $q_args['post__not_in'] = [$context_post_id];
    }

    $blueprints = get_posts($q_args);

    if (empty($blueprints)) {
        $html = '<div class="nhsuk-u-margin-top-3 nhsuk-u-secondary-text-color">' . esc_html($args['empty_message']) . '</div>';
        wp_cache_set($cache_key, $html, 'nhsuk-blueprints', $cache_ttl);
        return $html;
    }

    // Columns
    $show_title = in_array('title', (array)$args['columns'], true);
    $show_desc  = in_array('description', (array)$args['columns'], true);

    // Build NHS table
    $out  = '<div class="nhsuk-u-margin-top-3">';
    $out .= '<table class="nhsuk-table">';
    $out .= '<caption class="nhsuk-table__caption nhsuk-table__caption--m">' . esc_html($args['caption']) . '</caption>';
    $out .= '<thead class="nhsuk-table__head"><tr class="nhsuk-table__row">';

    if ($show_title) {
        $out .= '<th scope="col" class="nhsuk-table__header">Blueprint</th>';
    }
    if ($show_desc) {
        $out .= '<th scope="col" class="nhsuk-table__header">Description</th>';
    }

    $out .= '</tr></thead><tbody class="nhsuk-table__body">';

    foreach ($blueprints as $bp) {
        $out .= '<tr class="nhsuk-table__row">';

        if ($show_title) {
            $out .= '<td class="nhsuk-table__cell"><a class="nhsuk-link" href="' . esc_url(get_permalink($bp)) . '">' . esc_html(get_the_title($bp)) . '</a></td>';
        }

        if ($show_desc) {
            $desc = '';
            if (function_exists('get_field')) {
                $field = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)$args['acf_field']);
                $desc = (string) get_field($field, $bp->ID);
            } else {
                $desc = has_excerpt($bp) ? $bp->post_excerpt : '';
            }
            $desc = wp_strip_all_tags($desc);
            $out .= '<td class="nhsuk-table__cell">' . esc_html($desc) . '</td>';
        }

        $out .= '</tr>';
    }

    $out .= '</tbody></table></div>';

    wp_cache_set($cache_key, $out, 'nhsuk-blueprints', $cache_ttl);
    return $out;
}

/**
 * Shortcode handler
 * Usage: [nhsuk_blueprints_by_pillar acf_field="description" limit="0" orderby="title" order="ASC" columns="title,description" empty_message="No related blueprints found."]
 */
function nhsuk_blueprints_by_pillar_shortcode($atts) {
    $atts = shortcode_atts([
        'acf_field'     => 'description',
        'limit'         => '0',
        'orderby'       => 'title',
        'order'         => 'ASC',
        'columns'       => 'title,description',
        'empty_message' => 'No related blueprints found.',
        'post_id'       => '0',
        'caption'       => '',
    ], $atts, 'nhsuk_blueprints_by_pillar');

    $columns = array_filter(array_map('trim', explode(',', (string) $atts['columns'])));
    if (empty($columns)) { $columns = ['title','description']; }

    $args = [
        'post_id'       => absint($atts['post_id']),
        'acf_field'     => sanitize_key($atts['acf_field']),
        'limit'         => absint($atts['limit']),
        'orderby'       => sanitize_key($atts['orderby']),
        'order'         => (strtoupper($atts['order']) === 'DESC') ? 'DESC' : 'ASC',
        'columns'       => array_map('sanitize_key', $columns),
        'empty_message' => (string) $atts['empty_message'],
        'caption'       => $atts['caption'] !== '' ? (string)$atts['caption'] : apply_filters('nhsuk_blueprints_table_caption', 'Examples of good practice'),
    ];

    return nhsuk_render_blueprints_by_pillar($args);
}
add_shortcode('nhsuk_blueprints_by_pillar', 'nhsuk_blueprints_by_pillar_shortcode');

// -----------------------------
// Dynamic block: scw/nhsuk-blueprints-by-pillar
// -----------------------------
add_action('init', function () {
    register_block_type('scw/nhsuk-blueprints-by-pillar', [
        'api_version' => 2,
        'attributes'  => [
            'acfField'     => ['type' => 'string', 'default' => 'description'],
            'limit'        => ['type' => 'number', 'default' => 0],
            'orderby'      => ['type' => 'string', 'default' => 'title'],
            'order'        => ['type' => 'string', 'default' => 'ASC'],
            'columns'      => ['type' => 'array',  'default' => ['title','description']],
            'emptyMessage' => ['type' => 'string', 'default' => 'No related blueprints found.'],
            'caption'      => ['type' => 'string', 'default' => ''],
        ],
        'uses_context' => ['postId'],
        'render_callback' => function ($attrs, $content, $block) {
            $context_post_id = 0;
            if (is_object($block) && isset($block->context['postId'])) {
                $context_post_id = absint($block->context['postId']);
            }
            if (!$context_post_id) {
                $context_post_id = get_the_ID();
            }

            $args = [
                'post_id'       => $context_post_id,
                'acf_field'     => isset($attrs['acfField']) ? sanitize_key($attrs['acfField']) : 'description',
                'limit'         => isset($attrs['limit']) ? absint($attrs['limit']) : 0,
                'orderby'       => isset($attrs['orderby']) ? sanitize_key($attrs['orderby']) : 'title',
                'order'         => (isset($attrs['order']) && strtoupper($attrs['order']) === 'DESC') ? 'DESC' : 'ASC',
                'columns'       => (isset($attrs['columns']) && is_array($attrs['columns']) && $attrs['columns']) ? array_map('sanitize_key', $attrs['columns']) : ['title','description'],
                'empty_message' => isset($attrs['emptyMessage']) ? (string)$attrs['emptyMessage'] : 'No related blueprints found.',
                'caption'       => !empty($attrs['caption']) ? (string)$attrs['caption'] : apply_filters('nhsuk_blueprints_table_caption', 'Related blueprints'),
            ];

            return nhsuk_render_blueprints_by_pillar($args);
        },
        'supports' => ['html' => false],
    ]);
}, 20);

```

The plugin saved time because all the team had to do was ensure that both success measure and blueprint were tagged to the taxonomy item.

[Return to homepage](/)
