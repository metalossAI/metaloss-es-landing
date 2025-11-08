import React from 'react';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import Chat from '@/Chat/Component';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const MobileHero: React.FC<Page['hero']> = ({ links, media, richText, badgeTitle }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-end px-4 py-8 border">
    <div className="w-full flex flex-col items-center justify-end gap-6">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <HoverBorderGradient content={badgeTitle ?? ""}/>
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full flex flex-col items-center h-1/2">
        <Chat />
      </div>
    </div>
    <div className="absolute inset-0 -z-10">
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} />
      )}
    </div>
  </div>
);

export default MobileHero;
