# CodeAgentSwarm-Landing Project Configuration

<!-- CODEAGENTSWARM PROJECT CONFIG START - DO NOT EDIT -->

## Project Configuration

**Project Name**: CodeAgentSwarm-Landing

_This project name is used for task organization in CodeAgentSwarm. All tasks created in this directory will be associated with this project._

_For complete CodeAgentSwarm instructions, see the global CLAUDE.md file at ~/.claude/CLAUDE.md_

<!-- CODEAGENTSWARM PROJECT CONFIG END -->

# Project-specific instructions can be added below this line

## Guides System

The landing page includes a documentation/guides system for creating bilingual content (EN + ES).

### Route Structure

- **English guides:** `/en/guides/[slug]`
- **Spanish guides:** `/es/guias/[slug]`

### Creating a New Guide

1. **Create content files** in `/content/guides/`:
   - English: `/content/guides/en/[slug].ts`
   - Spanish: `/content/guides/es/[slug].ts`

2. **Slug conventions:**
   - Use kebab-case: `how-to-use-feature` (EN), `como-usar-feature` (ES)
   - Every guide MUST have both EN and ES versions
   - Link them via `alternateSlug` in metadata

3. **Register the guide** in `/content/guides/index.ts`:
   ```typescript
   import enNewGuide from './en/my-new-guide'
   import esNewGuide from './es/mi-nueva-guia'

   export const guides = {
     en: {
       'my-new-guide': enNewGuide,
     },
     es: {
       'mi-nueva-guia': esNewGuide,
     },
   }
   ```

### Guide Content Structure

```typescript
const guide: Guide = {
  meta: {
    slug: 'my-guide-slug',
    locale: 'en',
    title: 'Page H1 Title',
    metaTitle: 'SEO Title (appears in browser tab)',
    metaDescription: 'SEO description for search results',
    intro: 'Introductory paragraph(s)',
    alternateSlug: 'mi-guia-slug', // Spanish equivalent
  },
  sections: [
    {
      id: 'section-id', // Used for TOC and anchor links
      title: 'Section Title',
      content: [
        { type: 'paragraph', text: '...' },
        { type: 'heading', level: 3, text: '...', id: 'subsection-id' },
        { type: 'list', items: ['item 1', 'item 2'] },
        { type: 'image', alt: 'Description', src: '#', caption: 'Optional' },
        { type: 'callout', variant: 'tip', content: '...' },
        { type: 'code', language: 'javascript', code: '...' },
      ],
    },
  ],
  faq: [
    { question: '...', answer: '...' },
  ],
}
```

### Content Block Types

| Type | Properties | Description |
|------|------------|-------------|
| `paragraph` | `text` | Regular text paragraph |
| `heading` | `level` (2\|3), `text`, `id` | H2 or H3 heading with anchor |
| `list` | `items[]` | Bullet list |
| `code` | `language?`, `code` | Code block |
| `image` | `alt`, `src`, `caption?` | Image (use `#` for placeholder) |
| `callout` | `variant` (tip\|warning\|info), `content` | Highlighted box |
| `divider` | - | Horizontal rule |

### SEO Requirements

Each guide automatically gets:
- `<title>` from `metaTitle`
- `<meta name="description">` from `metaDescription`
- Canonical URL
- Hreflang links (EN ↔ ES)
- JSON-LD Article schema

### Image Placeholders

Use markdown-like syntax with `#` as src for placeholders:
```typescript
{ type: 'image', alt: 'Description of what the image shows', src: '#' }
```

The system renders a styled placeholder that indicates where an image should go.

### Writing Style

- **NO em dashes (—)**: Never use em dashes in content. Use regular dashes (-) or commas instead.
  - ❌ Wrong: `CodeAgentSwarm — the best tool`
  - ✅ Correct: `CodeAgentSwarm - the best tool` or `CodeAgentSwarm, the best tool`
- Keep the tone natural, human, and conversational
- Avoid robotic or overly formal language
