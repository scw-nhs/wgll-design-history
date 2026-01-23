
# NHSUK Taxonomy Tags (Pillars + OAM)

Server‑rendered, accessible tags for **Pillars** and **OAM business capabilities** that work reliably inside **Query Loop** / **Post Template** blocks. Includes a dynamic block for the block editor and a fallback shortcode.

- **Block name**: `scw/nhsuk-tags`
- **Shortcode**: `[nhsuk_tags]`
- **WordPress**: 6.3+ (tested to 6.9)

---

## Screenshots

> Replace these placeholders with your own PNGs (put them in `/docs/` and adjust paths).

1. **Inserter + sidebar settings**  
   ![screenshot-1](docs/screenshot-1.png)

2. **Used inside a Query Loop / Post Template**  
   ![screenshot-2](docs/screenshot-2.png)

3. **Front‑end rendering (Nightingale/NHS.UK Frontend)**  
   ![screenshot-3](docs/screenshot-3.png)

---

## Download

- **Plugin ZIP (v1.3.0)**: [nhsuk-taxonomy-tags-1.3.0.zip](https://dev.to/josephciullo/react-custom-hook-controller-pattern-creating-a-sortable-table-2cal)

---

## Why did we create this plugin?

We needed to display relationships between WGLL and the NHS One Architecture Model (OAM) Business Capability Groups. Over time, OAM will become the default way to describe the way that health and care systems in England operate. Individual success measure pages in WGLL are tagged to relevant OAM business capabilities. These are displayed as (non-clickable) NHS-style tags. 

Simple shortcodes don't work in query loops (how we display child pages in WGLL to allow users to 'drill down' from the 7 pillars to see related guidance, frameworks, resources and examples of good practice such as NHS blueprints. This is how we are trying to solve the 'too much information' problem from user research and make it easier for users to navigate WGLL and access task-specific content. So we needed dynamic blocks.

Dynamic blocks that depend on the **current loop post** should render on the server using a `render_callback` and save `null` in the editor. That avoids validation and hydration issues in Query Loops and guarantees consistent output. Seed `usesContext` for details.  
**Refs:** WordPress Block Editor docs on dynamic blocks and `render_callback` (server‑side rendering) and `usesContext`/`postId`. [1](https://wordpress.stackexchange.com/questions/395694/how-to-define-a-block-style-in-an-innerblocks-template)

---

## Installation

1. **Plugins → Add New → Upload Plugin** → upload the ZIP → **Activate**.
2. Ensure your theme (e.g., **Nightingale**) loads **NHS.UK Frontend** so `.nhsuk-` utilities and component styles are available.
3. (Optional) Attach the `oam-business-capability` taxonomy to additional CPTs via the filter shown below.

---

## Usage

### A) Insert the dynamic block (recommended)

1. Add a **Query Loop** block.  
2. Select its **Post Template** area.  
3. Insert **“NHSUK Tags (Pillars + OAM)”** (`scw/nhsuk-tags`).
4. Configure settings in the **sidebar**:
   - **Show Pillars** (default: on)
   - **Show OAM** (default: on)
   - **Show group labels** (adds a small text label before each tag group)
   - **Limit per group** (0 = no limit)
   - **Labels** (override the default group labels)
5. View on the front‑end or in Site Editor preview to see the server‑rendered output.

> **Do not** place the block inside a **core/HTML** block. The HTML block stores raw text and prevents the block parser from rehydrating the block. Use a real nested block inside the Post Template.  
**Ref:** Block serialization & parser docs. [2](https://design-system.service.gov.uk/styles/links/)

### B) Shortcode (classic templates)

```text
[nhsuk_tags pillars="true" oam="true" show_labels="false" limit="0" post_id="0"]
