import { Block } from 'payload';

export const PartnersBanner: Block = {
  slug: 'partnersBanner',
  labels: {
    singular: 'Partners Banner',
    plural: 'Partners Banners',
  },
  fields: [
    {
      name: 'partners',
      label: 'Partners',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          label: 'Partner Name',
          type: 'text',
        },
        {
          name: 'url',
          label: 'Partner URL',
          type: 'text',
        },
      ],
    },
  ],
};
