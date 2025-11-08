import type { Block } from 'payload'
import Card from '@/blocks/Card/config'
import { Content as ContentBlock } from '@/blocks/Content/config'

const Grid: Block = {
  slug: 'grid',
  labels: {
    singular: 'Grid',
    plural: 'Grids',
  },
  fields: [
    {
      name: 'columns',
      type: 'number',
      label: 'Columns',
      required: false,
      min: 1,
      max: 6,
      defaultValue: 3,
    },
    {
      name: 'gap',
      type: 'text',
      label: 'Gap (CSS, e.g. 1.5rem)',
      required: false,
      defaultValue: '1.5rem',
    },
    {
      name: 'className',
      type: 'text',
      label: 'CSS Class',
      required: false,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Grid Items',
      required: false,
      blocks: [
        Card,
        ContentBlock,
      ],
    },
  ],
};

export default Grid;
