import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { WaitlistBlock } from './Waitlist/Component'
import AgentHero from './AgentHero/Component'
import { Card } from './Card/Component'
import { Grid } from './Grid/Component'
import { PostBlock } from './PostBlock/Component'
import { PartnersBanner } from './PartnersBanner/Component'
import { RollingImageMarqueeBlock } from './RollingImageMarquee/Component'
import Section from './Section/Component'
import { BentoGridBlock } from './BentoGridBlock/Component'
import Hero from './Hero/Component'
import Features from './Features/Component'
import CTA from './CTA/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaBlock: CTA,
  card: Card,
  grid: Grid,
  section: Section,
  hero: Hero,
  features: Features,
  bentoGridBlock: BentoGridBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  codeBlock: CodeBlock,
  waitlist: WaitlistBlock,
  agentHero: AgentHero,
  postBlock: PostBlock,
  partnersBanner: PartnersBanner,
  rollingImageMarquee: RollingImageMarqueeBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
