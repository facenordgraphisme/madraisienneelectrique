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
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Essentiel pour le score E-E-A-T',
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
      title: 'Contenu HTML (Legacy)',
      type: 'text',
      description: 'Contenu HTML importé depuis WordPress',
      rows: 10,
    }),
    defineField({
      name: 'body',
      title: 'Contenu Riche (Moderne)',
      type: 'blockContent',
      description: 'Nouveau contenu structuré (recommandé pour les nouveaux articles)',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO (Override)',
      type: 'string',
      group: 'seo',
      description: 'Si vide, utilise le titre de l\'article.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description SEO',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: '150-160 caractères. Indispensable pour le CTR.',
      validation: (Rule) => Rule.max(160).warning('La meta description idéale fait entre 140 et 160 caractères.'),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Points clés (TL;DR)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Boîte "Ce qu\'il faut retenir" en haut de l\'article (signal AI)',
    }),
    defineField({
      name: 'faq',
      title: 'Foire Aux Questions (FAQ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Réponse', rows: 3 },
          ],
        },
      ],
      description: 'Génère automatiquement le schéma FAQPage JSON-LD',
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
