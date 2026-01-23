# NHSUK Related Blueprints (by Pillar)

Server‑rendered, accessible table of related **blueprint** posts that share one or more **pillar** terms with the current post. Ships with a **dynamic block** (for the Block Editor / Site Editor) and a **shortcode** (for classic templates).

- **Block**: `scw/nhsuk-blueprints-by-pillar`
- **Shortcode**: `[nhsuk_blueprints_by_pillar]`
- **Requires WordPress**: 6.3+
- **Tested up to**: 6.9
- **Version**: 1.1.0

The block is **server‑rendered** using a `render_callback` so it’s reliable inside **Query Loop / Post Template** layouts, and it won’t fall over when markup changes. (This follows WordPress guidance for **dynamic blocks** with `usesContext: ["postId"]`.)  
**Refs:** Creating dynamic blocks (Block Editor handbook) [1](https://design-system.service.gov.uk/components/table/)

---

## Screenshots

> Put your screenshots in `/docs/` and update these paths.

1. **Inserter + settings**  
   `docs/screenshot-1.png`

2. **Placed in a Query Loop / Post Template**  
   `docs/screenshot-2.png`

3. **Front‑end table (NHS.UK Frontend / Nightingale)**  
   `docs/screenshot-3.png`

---

## Download

- **Plugin ZIP (v1.1.0)**: [nhsuk-related-blueprints-1.1.0.zip](https://design-system.nhsapp.service.nhs.uk/get-started/nhsapp-frontend/)

---

## Why do this as a shortcode?

We need to call tagged blueprints dynamically to reduce manual maintenance overhead. The blueprints directory is generated from a spreadsheet controlled by the Blueprinting team. Every time it's updated, we need to match existing blueprints to the tags in WGLL. We don't want to have to update every page if tags change. Developing both a shortcode and block that works in query loops gives us options to develop specific presentations for different users at a later stage, as per user research.

---

## Why server‑rendered?

When a block’s output depends on the **current loop item** (here, the page/post in a Query Loop), the recommended pattern is to **render on the server** (PHP `render_callback`) and **save `null`** in the editor. That avoids block validation issues when markup changes and guarantees consistent, up‑to‑date output.  
**Ref:** Dynamic blocks & `render_callback` in Block Editor docs [1](https://design-system.service.gov.uk/components/table/)

---

## Installation

1. In wp‑admin go to **Plugins → Add New → Upload Plugin**.
2. Upload **nhsuk-related-blueprints-1.1.0.zip** and **Activate**.
3. Ensure your theme (e.g. **Nightingale**) is loading **NHS.UK Frontend** so `.nhsuk-` classes render correctly.

> If you previously used an MU (must‑use) version of this feature, **remove** `/wp-content/mu-plugins/related-blueprints.php` first. MU plugins load **before** admin‑AJAX/REST and can corrupt update responses if they emit output.  
**Ref:** Must‑Use plugins behaviour & load order [2](https://wordpress.stackexchange.com/questions/251388/plugin-generated-unexpected-output-during-activation-but-it-is-empty)

---

## Usage

### A) Block (recommended)

1. Insert **Query Loop** and select its **Post Template** area.
2. Add **“NHSUK Related Blueprints (by Pillar)”**.
3. Configure in the sidebar:
   - **ACF field for description**: defaults to `description`
   - **Limit**: number of rows (0 = no limit)
   - **Order by**: `title | date | modified | menu_order`
   - **Order**: `ASC | DESC`
   - **Columns**: toggle **Title** and/or **Description**
   - **Empty message**: fallback text
   - **Caption**: optional table caption

> **Important:** Don’t place the block inside a **core/HTML** block. Raw HTML stores as text and prevents the block parser from rehydrating the block on reopen.  
**Ref:** Block serialization & parser docs [3](https://digital.nhs.uk/about-nhs-digital/corporate-information-and-documents/our-style-guidelines)

### B) Shortcode (classic templates)

```text
[nhsuk_blueprints_by_pillar 
  acf_field="description" 
  limit="0" 
  orderby="title" 
  order="ASC" 
  columns="title,description" 
  empty_message="No related blueprints found." 
  caption="Related blueprints"]
