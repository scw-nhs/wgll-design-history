---
layout: post
title: Version 5
description: Handing over the alpha
includeInBreadcrumbs: true
date: 2026-03-13
author: WGLL delivery team at SCW
---
## Are we beta-ready?

Version 4 of the alpha addressed some of the remaining [issues identified in user research](/version3/) to make sure this refresh of WGLL met its users' needs and stakeholder expectations. Discussions started about handover formats and next steps. The team carried out an internal, informal self-assessment against the 17 NHS service standard points to decide if the prototype was ready for beta development on an appropriate platform:

1. **Understand users and their needs in the context of health and care** - the team has researched users, needs and scenarios, with participants ranging from frontline staff to digital leaders.
2. **Work towards solving a whole problem for users** - research showed that the modular approach to content design, directly linking each pillar's individual success measures to specific ways it was measured and relevant examples of good practice (from Blueprints) addressed previous issues with the long-form format whilst also allowing this to be created programmatically from modular pages.
3. **Provide a joined up experience across all channels** - although this is a digital information service, it provides a basis for products to be developed in digital and non-digital channels
4. **Make the service simple to use** - this was a key focus of the team's 'test, learn, iterate' approach, and the design has changed considerably as a result of usability testing
5. **Make sure everyone can use the service** - unusually for an alpha, the rapid prototype was reasonably accessible as it was built using the Nightingale theme but additional work at beta (plus an accessibility audit) would ensure that the user experience was consistently good for people with additional access needs. Language was simplified into plain English, as per the NHS.UK content guide.
6. **Create a team that includes multidisciplinary skills and perspectives** - the alpha was developed by a multi-disciplinary team including UCD roles, BAs, Delivery, Technical and Product
7. **Use agile ways of working** - the team worked in agile sprints and was able to pivot and reprofile in response to changing requirements or insights from research
8. **Iterate and improve frequently** - the alpha prototype was built in a modular that enabled it to be iterated and improved easily, with version control on individual success measures
9. **Create a secure service which protects people's privacy** - the prototype was password protected and the team had roles-based access permissions
10. **Define what success looks like and be open about how your service is performing** - the alpha has full analytics capability and the team created target user journeys which can be used as a basis for analytics at beta
11. **Choose the right tools and technology** - the team [explained its choice of WordPress](/sprint1/) and the alpha has been designed to be platform-agnostic, ie easily replatformed. The team has shared its approach to using WordPress as a rapid prototyping tool with the Nightingale theme developers and community of practice
12. **Make new source code open** - the team shared its approach and the various ways it extended WordPress, including with the NHS Nightingale community of practice
13. **Use and contribute to open standards, common components and patterns** - the team has used NHS frontend design patterns and components, via Nightingale and custom css, aiming for consistency with similar information websites
14. **Operate a reliable service** - hosting and downtime are less of a concern for the alpha but the WordPress site uses caching and indexing to ensure good performance
15. **Support a culture of care** - the team carried out research in a range of care settings and took a participatory co-design approach to stakeholder engagement
16. **Make your service clinically safe** - whilst the alpha would not be used in direct care, content for specific care settings was developed with clinical input from the outset
17. **Make your service interoperable** - WordPress has APIs and can connect to other services

Overall, the team felt comfortable that it would be able to tell its story well at assessment if required. 

## Content handover options
The WGLL team met with the NHSE web team who are planning the consolidation of the various NHSE web pages. They discussed 3 possible options for beta:

1. **WGLL would become a standalone website on an nhs.uk domain**. This would retain all the alpha's additional functionality developed to meet user needs (such as its index of blueprints), and even, subject to work on accessiblity, allow the WordPress platform to be maintained. Blueprints could be added to this platform if FutureNHS was discontinued, as could targeted improvement resources based on WGLL success measure content.
2. **WGLL would become part of wider guidance on good practice**. Potentially, some aspects of the modular content could be retained, subject to the destination platform's functionality. WGLL's 7 pillars are widely recognised and could be used as a structural framework for reporting. This could improve the link between mandatory and optional measurement and assessment tools like DMA and DSPT.
3. **WGLL would be retained as a guidance webpage with PDF version**. The long-form guidance could be migrated into a new content management system and retained, as before, as a long html web page. This would reduce its usability but protect the considerable content redesign work. Dynamically generated tables and other page elements can be recreated as static content.

The alpha prototype supports all 3 options so the team focused on making sure that options 1 and 2 (the more complex options) had sufficient documentation to inform future work.

## Handover documentation

| Item | Description
| --- | --- 
| [Alpha prototype documentation](/assets/pdfs/WGLL-alpha-technical-documentation.pdf) PDF (1.7Mb) | The main documentation for the Alpha prototype development, complementing this design history. It sets out a range of options for content migration, should the alpha be replatformed for Beta.
| [Nightingale child theme](/) Zip file (579kb) | Download the child theme used in the Alpha with all templates, parts, partials
| [How to add metrics and blueprints](/assets/pdfs/WGLL-working-practice.pdf) | Working practice for content designers to update metrics metadata
| [Aligning WGLL to OAM](/assets/pdfs/WGLL-align-OAM.pdf) | Paper exploring how WGLL pillars align to OAM business capabilities

[Return to homepage](/)
