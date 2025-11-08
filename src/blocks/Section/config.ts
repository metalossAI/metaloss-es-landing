import type { Block } from 'payload'
import Card from '@/blocks/Card/config'
import Grid from '@/blocks/Grid/config'
import { Content } from '@/blocks/Content/config'
import BentoGridBlock from '@/blocks/BentoGridBlock/config'

const Section: Block = {
  slug: 'section',
  labels: {
    singular: 'Section',
    plural: 'Sections',
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
      required: false,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Section Content',
      required: false,
      blocks: [
        Card,
        Grid,
        Content,
        BentoGridBlock,
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'CSS Class',
      required: false,
    },
  ],
}

export default Section
