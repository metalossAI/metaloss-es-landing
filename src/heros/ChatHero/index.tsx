'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import Chat from '@/Chat/Component';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export const ChatHero: React.FC<Page['hero']> = ({ links, media, richText, badgeTitle }) => {
  const { setHeaderTheme } = useHeaderTheme();
  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  return (
    <div className="relative min-h-screen flex justify-center overflow-hidden">
      {/* Responsive content: flex-col on mobile/tablet, flex-row on lg+ */}
      <div className="h-[80%] py-8 px-8 w-full relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-10 rounded-xl shadow-lg overflow-hidden z-10">
        {/* Background image clipped to container */}
        <div className="absolute inset-0 -z-10 select-none">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover" priority resource={media} />
          )}
        </div>
        {/* Text and links */}
        <div className="flex-1 min-w-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left lg:p-10">
          <HoverBorderGradient content={badgeTitle ?? ""}/>
          {richText && <RichText className="mb-6 lg:mb-10" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center lg:justify-start gap-4 lg:gap-6">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Chat */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center lg:p-10">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ChatHero;
