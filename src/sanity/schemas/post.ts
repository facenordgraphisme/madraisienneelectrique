import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'L\'URL de l\'article, ex: /draisienne-electrique-guide',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image à la une',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Légende',
        }),
      ],
    }),
    defineField({
      name: 'featuredImageUrl',
      title: 'URL image externe (fallback)',
      type: 'url',
      description: 'Utilisé si aucune image Sanity n\'est uploadée',
      hidden: ({ document }) => !!document?.featuredImage,
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Alt image externe',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Résumé court affiché dans les cards',
    }),
    defineField({
      name: 'content',
      title: 'Contenu HTML',
      type: 'text',
      description: 'Contenu HTML importé depuis WordPress',
      rows: 20,
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'wordpressId',
      title: 'ID WordPress (migration)',
      type: 'number',
      readOnly: true,
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Sans catégorie',
        media,
      }
    },
  },
})
