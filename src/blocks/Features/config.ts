import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: {
    singular: 'Features Section',
    plural: 'Features Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
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
      name: 'layout',
      type: 'radio',
      label: 'Layout Style',
      options: [
        {
          label: 'Grid Layout',
          value: 'grid',
        },
        {
          label: 'List Layout',
          value: 'list',
        },
      ],
      defaultValue: 'grid',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'columns',
      type: 'radio',
      label: 'Grid Columns',
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
      defaultValue: '3',
      admin: {
        layout: 'horizontal',
        condition: (_, siblingData) => siblingData?.layout === 'grid',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Feature Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
              ]
            },
          }),
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          admin: {
            description: 'Emoji or icon character (e.g., 🚀, ⚡, 💡)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Feature Image',
          relationTo: 'media',
          admin: {
            description: 'Alternative to icon - use an image instead',
          },
        },
      ],
    },
  ],
}
