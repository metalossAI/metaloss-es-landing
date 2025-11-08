import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'Small text above the title',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
          ]
        },
      }),
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'Primary Call to Action',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Link Type',
          options: [
            {
              label: 'Custom URL',
              value: 'custom',
            },
            {
              label: 'Internal Page',
              value: 'reference',
            },
          ],
          defaultValue: 'custom',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          label: 'Internal Page',
          relationTo: ['pages'],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in New Tab',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      label: 'Secondary Call to Action',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Link Type',
          options: [
            {
              label: 'Custom URL',
              value: 'custom',
            },
            {
              label: 'Internal Page',
              value: 'reference',
            },
          ],
          defaultValue: 'custom',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
        {
          name: 'reference',
          type: 'relationship',
          label: 'Internal Page',
          relationTo: ['pages'],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in New Tab',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      admin: {
        description: 'Optional background image for the hero section',
      },
    },
  ],
}
