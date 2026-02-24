---
layout: post
title: Guidance on the Metrics Table plug-in
description:  NHS Nightingale (WordPress) – “Metrics” Two‑Column Table (Success measure / How it is measured)
includeInBreadcrumbs: true
date: 2026-01-30
author: WGLL delivery team at SCW
---

## Functionality needed

This plugin is designed for WGLL to present metrics for WGLL success measures in an NHS-styled table. Metrics have a description and can be measured in up to 3 different ways - with URLs. They are ACF taxonomy items with an attached ACF field group. The setup is:

- **Taxonomy**: `metrics` (Name, Description, Slug)  
- **ACF Field Group**: `metrics-metadata` (`group_6984e6c34bf33`) on **Metrics** terms  
- **Fields on each metric term**: `how_1` | `url_1`, `how_2` | `url_2`, `how_3` | `url_3`  
- **Output**: An **NHS.UK-styled table** with **two columns only**:  
  1) **Success measure** → the **term description** (falls back to term name)  
  2) **How it is measured** → up to **three** items: each shows **how_X** as link text (linked to **url_X** when present)

No tags are displayed in this version.

---

## Contents

- [Why this structure](#why-this-structure)  
- [Install the shortcode plugin](#install-the-shortcode-plugin)  
- [Set up the content model](#set-up-your-content-model)  
- [Use the shortcode](#use-the-shortcode)  
- [Shortcode attributes](#shortcode-attributes)  
- [Examples](#examples)  
- [Styling & accessibility](#styling--accessibility)  
- [Troubleshooting](#troubleshooting)  
- [Changelog](#changelog)

---

## Why this structure

WGLL has **7 L1 pillars → success measures → metrics**, where a metric can be **reused** across success measures. Treating each metric as a **taxonomy term** keeps the model clean and lets us:

- Maintain each metric’s definition (term **Description**) and its **measurement methods** (ACF fields) in one place.
- Reuse metrics across many success measure pages simply by **tagging** the page with the term.
- Render a consistent **NHS.UK table** anywhere using a **shortcode**.

---

## Install the shortcode plugin

Use the plugin that renders a **two‑column** NHS table.

- **Download**: *NHS Metrics Table (Shortcode) – v1.1*  
  *(contains `[nhs_metrics_table]`)*

---

## Set up the ACF groups

1) **Taxonomy**: ensure a custom taxonomy **`metrics`** exists.  
2) **ACF on taxonomy terms**: create field group **`metrics-metadata`** (`group_6984e6c34bf33`) and assign it to **taxonomy = metrics** (all terms). Add six fields on the term:

- `how_1` (Text or Textarea)
- `url_1` (URL)
- `how_2` (Text or Textarea)
- `url_2` (URL)
- `how_3` (Text or Textarea)
- `url_3` (URL)

> Authors can populate any combination of the three pairs. Empty `how_X` values are ignored.

3) **Tag success measure pages** with relevant metric terms (reusing terms across pages is fine and encouraged).

---

## Use the shortcode

Place this on any **Success measure** page:

```
[nhs_metrics_table]
```

**What it outputs**

- **Column 1 – Success measure**: The metric **term description** (supports basic HTML). If the description is empty, the term **name** is used.
- **Column 2 – How it is measured**: Up to three lines, one per **how_X/url_X** pair. Each **how_X** becomes the link text; if **url_X** is provided, it’s an **`<a class="nhsuk-link">`** opening in a new tab.

---

## Shortcode attributes

These are optional and help you tailor the output without editing code:

- `taxonomy="metrics"` — the taxonomy slug.  
- `success_label="Success measure"` — column heading for the description.  
- `how_label="How it is measured"` — column heading for the list of methods.  
- `orderby="name"` — sort terms by `name` (or `slug`, etc.).  
- `order="ASC"` — `ASC` or `DESC`.  
- Override field names if your ACF differs:  
  `how_1`, `url_1`, `how_2`, `url_2`, `how_3`, `url_3`.

---

## Examples

Rename the second column header:

```
[nhs_metrics_table how_label="How it is measured (sources)"]
```

Order by slug, descending:

```
[nhs_metrics_table orderby="slug" order="DESC"]
```

Custom ACF field names (only if you changed them):

```
[nhs_metrics_table how_1="method_one" url_1="link_one" how_2="method_two" url_2="link_two" how_3="method_three" url_3="link_three"]
```

---

## Styling & accessibility

- The table uses **NHS.UK Frontend** classes (as provided by the Nightingale theme): `nhsuk-table`, `nhsuk-table__head`, `nhsuk-table__body`, etc.
- Cells include `data-label` attributes to improve readability on small screens (supports the responsive table pattern).
- Links use the `nhsuk-link` class and open in a new tab with `rel="noopener"`.

---

## Troubleshooting

- **No rows**: Confirm the page is **singular** (a page/post view) and that it’s tagged with at least one **metrics** term.
- **No methods**: Ensure ACF is **active**, the field group is assigned to **taxonomy = metrics**, and your values are saved on the **term** (not on the post). The plugin reads `get_field( 'how_1', 'term_{term_id}' )` etc.
- **Description missing**: If a term has no Description, the plugin falls back to the term **Name** for the left column.

---

## Changelog

**v1.1**  
- Two‑column output: **Success measure** (term Description) and **How it is measured** (up to three `how_X` → `url_X` pairs). No tags.

**v1.0**  
- Initial four‑column prototype (included tags and repeater rows).
