# NHS Nightingale (WordPress) – Rendering ACF Taxonomy Terms as NHS Tags and a Reusable “Metrics” Table (Shortcode)

> **Original prompt (from Sam):**  
> *“wordpress - how can I present an ACF taxonomy item in a cell for a standard NHS nightingale table? I want to style it using nhsuk-tag”*

This document captures a complete, practical approach you can use on Nightingale/WordPress to:

1. Render ACF taxonomy terms as **NHS.UK `nhsuk-tag`** inside table cells, and  
2. Adopt a reusable **“Metrics”** taxonomy + ACF term fields and a **shortcode** that outputs an NHS‑styled table of the metrics tagged to a given page (“Success measure” pages), with each metric showing:
   - **Slug (in CAPS)** as an NHS tag (first column),
   - **Metric title** (term name),
   - Up to **3 (or more) measurement methods** (each with “how it’s measured” + a **source URL**).

---

## Contents

- [Why this architecture](#why-this-architecture)  
- [Option A: Quick inline render of ACF taxonomy terms as NHS tags](#option-a-quick-inline-render-of-acf-taxonomy-terms-as-nhs-tags)  
- [Option B: Reusable plugin & shortcode for a “Metrics” table](#option-b-reusable-plugin--shortcode-for-a-metrics-table)  
  - [What the plugin does](#what-the-plugin-does)  
  - [Download & install](#download--install)  
  - [Your content model](#your-content-model)  
  - [Shortcode usage](#shortcode-usage)  
  - [Shortcode attributes](#shortcode-attributes)  
  - [Examples](#examples)  
  - [Styling & accessibility](#styling--accessibility)  
  - [Filters & extensibility](#filters--extensibility)  
  - [Troubleshooting](#troubleshooting)  
  - [Changelog](#changelog)  
- [Appendix: Minimal helper for rendering ACF taxonomy as tags (if you don’t use the plugin)](#appendix-minimal-helper-for-rendering-acf-taxonomy-as-tags-if-you-dont-use-the-plugin)

---

## Why this architecture

You described a structure with **7 L1 pillars → up to 10 success measures each → up to 10 metrics each**. Each metric needs:

- A **title** (term name is perfect),
- **How it’s measured** (text),
- A **URL** for the method (up to 3 variants per metric).

This strongly suggests a **reusable taxonomy** for “Metrics” with **ACF fields on terms** (repeatable “methods” rows). It gives:

- **Reusability**: One metric can be tagged to multiple success measures.
- **Clean data model**: Metric = first‑class concept (term).
- **Separation of concerns**: Content authors maintain metrics centrally; pages just **tag** the terms.
- **Consistent UI**: A shortcode renders a standard NHS‑styled table on any page.

---

## Option A: Quick inline render of ACF taxonomy terms as NHS tags

If you *only* want to display taxonomy terms as tags in a Nightingale table cell, here’s a minimal pattern (ACF return = **Term Objects**):

```php
<?php
$terms = get_field( 'standard_codes' ); // ACF taxonomy field, return = Term Object(s)
if ( $terms ) {
  foreach ( $terms as $term ) {
    $colour = 'grey';
    switch ( $term->slug ) {
      case 'compliant':     $colour = 'green'; break;
      case 'in-review':     $colour = 'blue';  break;
      case 'not-met':       $colour = 'red';   break;
    }
    printf(
      '<span class="nhsuk-tag nhsuk-tag--%1$s">%2$s</span> ',
      esc_attr( $colour ),
      esc_html( strtoupper( $term->slug ) ) // slug in CAPS
    );
  }
}
?>
```

And a simple NHS table structure (Nightingale uses NHS classes):

```php
<table class="nhsuk-table">
  <thead class="nhsuk-table__head">
    <tr class="nhsuk-table__row">
      <th scope="col" class="nhsuk-table__header">Title</th>
      <th scope="col" class="nhsuk-table__header">Standard</th>
    </tr>
  </thead>
  <tbody class="nhsuk-table__body">
    <?php while ( have_posts() ) : the_post(); ?>
      <tr class="nhsuk-table__row">
        <td class="nhsuk-table__cell"><?php the_title(); ?></td>
        <td class="nhsuk-table__cell">
          <!-- Output tags here -->
        </td>
      </tr>
    <?php endwhile; ?>
  </tbody>
</table>
```

> If you need ID(s) instead of Term Objects, call `get_term( $id )` first, then render the tag.

---

## Option B: Reusable plugin & shortcode for a “Metrics” table

### What the plugin does

- Registers a shortcode **`[nhs_metrics_table]`**.
- Fetches **Metrics** taxonomy terms **tagged to the current page**.
- Renders an **NHS.UK table** with:
  - **Column 1**: metric **slug in UPPERCASE as `nhsuk-tag`** (colour configurable),
  - **Column 2**: metric **title** (term name; optional link to term archive),
  - **Column 3**: **How it’s measured** (from ACF repeater on term),
  - **Column 4**: **Source** link (from ACF repeater on term).
- Supports any number of method rows (you can set a max of 3 in ACF if desired).

### Download & install

- Download the plugin zip: **NHS Metrics Table (Shortcode)**  
  *(add this file to your repo or upload via WP Admin → Plugins → Add New → Upload)*

**Install:**
1. WordPress Admin → **Plugins** → **Add New** → **Upload Plugin**.  
2. Select the zip → **Install Now** → **Activate**.

### Your content model

1. **Taxonomy**: `metrics` (or your chosen slug).
2. **Term meta via ACF**: Assign a field group to the **Metrics** taxonomy with:
   - **Repeater** field e.g. `methods` (limit to 3 rows if you prefer),
     - Subfield `how` (Text or Textarea) — “how it’s measured”
     - Subfield `url` (URL) — methodology/source link

3. **Tagging**: On each **Success measure** page, tag the relevant **Metrics** terms.

### Shortcode usage

Place the shortcode on any Success measure page:

```
[nhs_metrics_table]
```

The table outputs:

- **METRIC-SLUG** as a **blue** NHS tag (default),
- **Title** as the term name,
- One table row per **method** (how + source link).

### Shortcode attributes

- `taxonomy="metrics"` — your taxonomy slug.  
- `tag_colour="blue"` — NHS tag colour (`blue`, `green`, `grey`, `red`, `yellow`, `orange`, `purple`, `pink`, `aqua-green`).  
- `link_terms="false"` — set `true` to link the **Title** to the term archive.  
- `empty_message="No metrics tagged to this page."` — customise empty state.  
- `orderby="name" order="ASC"` — control term ordering.  
- `methods_field="methods" method_how="how" method_url="url"` — use these if your ACF field/subfield names differ.

### Examples

Link term titles and render tags in green:

```
[nhs_metrics_table link_terms="true" tag_colour="green"]
```

Custom ACF names:

```
[nhs_metrics_table methods_field="measurement_methods" method_how="how_text" method_url="how_url"]
```

Order by slug descending:

```
[nhs_metrics_table orderby="slug" order="DESC"]
```

### Styling & accessibility

- Uses **NHS.UK Frontend** table classes (`nhsuk-table`, `nhsuk-table__head`, `nhsuk-table__body`, etc.) so it fits Nightingale styling out of the box.
- Uses `rowspan` when a metric has multiple methods to keep the layout compact and scannable.
- Adds `data-label` attributes to cells to support responsive table patterns used by NHS.UK styles.
- Minor inline CSS spacing for tags inside cells:
  ```css
  .nhsuk-table__cell .nhsuk-tag {
    margin-right: 0.25rem;
    margin-bottom: 0.125rem;
    display: inline-block;
  }
  ```

### Filters & extensibility

**Per-term tag colours** via a filter:

```php
add_filter('nhsmt_tag_colour_for_term', function($default_colour, $term){
  $map = [
    'compliant'    => 'green',
    'in-review'    => 'blue',
    'not-met'      => 'red',
    'deprecated'   => 'grey',
  ];
  return $map[$term->slug] ?? $default_colour;
}, 10, 2);
```

**Ideas to extend:**
- Add a column for the **term description** (metric definition).
- Add an **export** button (CSV) built from the rendered dataset.
- Add **facets** (e.g., by pillar or theme) above the table.
- Provide a **block** version in Gutenberg in addition to the shortcode.

### Troubleshooting

- **No output?** Ensure the page is **singular** (a single page/post), and that the page **has metrics tagged**.
- **No methods shown?** Check that ACF field group is **assigned to the taxonomy**, and that data is saved on the **term** (not on posts). The plugin reads `get_field( 'methods', 'term_' . $term_id )`.
- **Nightingale styles not applied?** Confirm your theme loads **NHS.UK Frontend** styles (Nightingale does by default).
- **Different ACF names?** Use the shortcode attrs: `methods_field`, `method_how`, `method_url`.

### Changelog

**1.0.0**  
- Initial release of the shortcode and table renderer.

---

## Appendix: Minimal helper for rendering ACF taxonomy as tags (if you don’t use the plugin)

A drop‑in function (add to your theme’s `functions.php` or a small mu‑plugin) that normalises ACF return formats (IDs/Objects) and renders NHS tags:

```php
<?php
function nhsuk_render_acf_tax_tags( $field_name, $post_id = 0, $link_terms = false, $colour_map = array() ) {
    $post_id = $post_id ?: get_the_ID();
    if ( ! $post_id ) return;

    $value = get_field( $field_name, $post_id );
    if ( empty( $value ) ) return;

    $terms = array();
    if ( is_object( $value ) && $value instanceof WP_Term ) {
        $terms = array( $value );
    } elseif ( is_array( $value ) ) {
        foreach ( (array) $value as $v ) {
            if ( $v instanceof WP_Term ) {
                $terms[] = $v;
            } elseif ( is_numeric( $v ) ) {
                $t = get_term( (int) $v );
                if ( $t && ! is_wp_error( $t ) ) $terms[] = $t;
            } elseif ( is_array( $v ) && isset( $v['term_id'] ) ) {
                $t = get_term( (int) $v['term_id'] );
                if ( $t && ! is_wp_error( $t ) ) $terms[] = $t;
            }
        }
    } elseif ( is_numeric( $value ) ) {
        $t = get_term( (int) $value );
        if ( $t && ! is_wp_error( $t ) ) $terms[] = $t;
    }

    foreach ( $terms as $term ) {
        $slug = $term->slug;
        $label = strtoupper( $slug ); // show slug (caps)
        $colour = $colour_map[ $slug ] ?? 'grey';
        $class = 'nhsuk-tag nhsuk-tag--' . esc_attr( $colour );
        $inner = '<span class="' . esc_attr( $class ) . '">' . esc_html( $label ) . '</span>';

        if ( $link_terms ) {
            $url = get_term_link( $term );
            if ( ! is_wp_error( $url ) ) {
                $inner = '<a class="' . esc_attr( $class ) . '" href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a>';
            }
        }
        echo $inner + ' ';
    }
}
```

Usage in a table cell:

```php
<td class="nhsuk-table__cell">
  <?php nhsuk_render_acf_tax_tags( 'standard_codes', get_the_ID(), false, [
    'compliant'    => 'green',
    'in-review'    => 'blue',
    'not-met'      => 'red',
    'deprecated'   => 'grey',
  ] ); ?>
</td>
```
