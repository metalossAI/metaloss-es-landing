import { Block } from 'payload';

export const RollingImageMarqueeBlock: Block = {
  slug: 'rollingImageMarquee',
  labels: {
    singular: 'Rolling Image Marquee',
    plural: 'Rolling Image Marquees',
  },
  fields: [
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'text',
        },
        {
          name: 'href',
          label: 'Link URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'speed',
      label: 'Scroll Speed (px/sec)',
      type: 'number',
      defaultValue: 60,
    },
    {
      name: 'height',
      label: 'Banner Height (px)',
      type: 'number',
      defaultValue: 80,
    },
  ],
};
