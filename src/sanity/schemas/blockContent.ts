import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Number', value: 'number' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
    },
    // Custom Button Block
    {
      title: 'Bouton CTA',
      name: 'button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Texte du bouton',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Lien (URL)',
          type: 'url',
        },
        {
          name: 'style',
          title: 'Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primaire (Vert)', value: 'primary' },
              { title: 'Secondaire (Sombre)', value: 'secondary' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    },
  ],
})
