import React from 'react';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import Chat from '@/Chat/Component';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const TabletHero: React.FC<Page['hero']> = ({ links, media, richText, badgeTitle }) => (
  <div className="relative min-h-screen flex items-center justify-center px-8 py-12 overflow-hidden">
    {/* Background image covers everything */}
    <div className="absolute inset-0 -z-10 select-none">
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} />
      )}
    </div>
    {/* Content: flex-col on mobile, flex-row on md+ */}
    <div className="w-full max-w-3xl flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-10 bg-white/80 rounded-xl shadow-lg overflow-hidden z-10">
      <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 md:p-10">
        <HoverBorderGradient content={badgeTitle ?? ""}/>
        {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex justify-center md:justify-start gap-6">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <Chat />
      </div>
    </div>
  </div>
);

export default TabletHero;
