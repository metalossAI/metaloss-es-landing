import type { Block } from 'payload';

export const AgentHeroBlock: Block = {
  slug: 'agentHero',
  interfaceName: 'AgentHeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Button Label',
      required: true,
      admin: {
        placeholder: "Start building",
      },
    },
    {
      name: 'ctaHref',
      label: 'CTA Target Section or URL',
      type: 'text',
      admin: {
        placeholder: "#features or #contact or /pricing",
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          type: 'text',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      label: 'Flow Cards',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required:true
        },
      ],
    },
  ],
  labels: {
    plural: 'Agent Heros',
    singular: 'Agent Hero',
  },
};
