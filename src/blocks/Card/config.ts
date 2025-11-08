import type { Block } from 'payload'

const Card: Block = {
  slug: 'card',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'className',
      type: 'text',
      label: 'CSS Class',
      required: false,
    },
  ],
};

export default Card;
