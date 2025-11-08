import React from 'react';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import Chat from '@/Chat/Component';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const DesktopHero: React.FC<Page['hero']> = ({ links, media, richText, badgeTitle }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background image covers everything */}
    <div className="absolute inset-0 -z-10 select-none">
      {media && typeof media === 'object' && (
        <Media fill imgClassName="object-cover" priority resource={media} />
      )}
    </div>
    {/* Content side by side */}
    <div className="w-full max-w-6xl flex flex-row items-stretch gap-14 bg-white/80 rounded-xl shadow-2xl overflow-hidden z-10">
      <div className="flex-1 flex flex-col items-start justify-center text-left p-12">
        <HoverBorderGradient content={badgeTitle ?? ""}/>
        {richText && <RichText className="mb-10 text-5xl" data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-10">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <Chat />
      </div>
    </div>
  </div>
);

export default DesktopHero;
