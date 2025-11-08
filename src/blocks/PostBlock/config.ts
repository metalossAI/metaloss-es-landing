import type { Block } from 'payload'

export const PostBlock: Block = {
  slug: 'postBlock',
  labels: {
    singular: 'Post Block',
    plural: 'Post Blocks',
  },
  fields: [
    {
      name: 'post',
      label: 'Post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      options: [
        {
          label: 'Card',
          value: 'card',
        },
        {
          label: 'Banner',
          value: 'banner',
        },
        {
          label: 'Outline',
          value: 'outline',
        },
      ],
      defaultValue: 'card',
    },
  ],
}

export default PostBlock
