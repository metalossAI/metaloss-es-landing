'use client'
import React, { useRef, useEffect } from 'react';
import { Media } from '@/payload-types';

export type RollingImageMarqueeBlockImage = {
  image?: Media;
  alt?: string;
  href?: string;
};

export type RollingImageMarqueeBlockProps = {
  images?: RollingImageMarqueeBlockImage[];
  speed?: number;
  height?: number;
};

interface RollingImageMarqueeProps {
  images: { src: string; alt?: string; href?: string }[];
  speed?: number; // pixels per second
  height?: number | string;
  className?: string;
}

const RollingImageMarquee: React.FC<RollingImageMarqueeProps> = ({
  images,
  speed = 60, // px/sec
  height = 80,
  className = '',
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  // Duplicate the images for seamless looping
  const imageList = [...images, ...images];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    let frame: number;
    let start: number | null = null;
    const scrollWidth = marquee.scrollWidth / 2;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const distance = (elapsed / 1000) * speed;
      marquee.scrollLeft = distance % scrollWidth;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    animationRef.current = frame;
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [speed, images]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10" style={{background: 'linear-gradient(to right, white 60%, transparent)'}} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10" style={{background: 'linear-gradient(to left, white 60%, transparent)'}} />
      <div
        ref={marqueeRef}
        className="flex flex-nowrap items-center h-full gap-8 px-8"
        style={{ scrollBehavior: 'auto', overflow: 'hidden' }}
      >
        {imageList.map((img, idx) => (
          img.href ? (
            <a
              key={idx}
              href={img.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center min-w-[120px] h-full"
            >
              <img
                src={img.src}
                alt={img.alt || ''}
                className="object-contain h-full max-h-full"
                draggable={false}
                style={{ maxWidth: 160 }}
              />
            </a>
          ) : (
            <img
              key={idx}
              src={img.src}
              alt={img.alt || ''}
              className="object-contain h-full max-h-full min-w-[120px]"
              draggable={false}
              style={{ maxWidth: 160 }}
            />
          )
        ))}
      </div>
    </div>
  );
};

export const RollingImageMarqueeBlock: React.FC<RollingImageMarqueeBlockProps> = ({ images, speed, height }) => {
  if (!images || images.length === 0) return null;

  // Map CMS images to the RollingImageMarquee's props
  const mappedImages = images
    .filter(img => img.image && typeof img.image === 'object' && 'url' in img.image)
    .map(img => ({
      src: (img.image as Media).url as string,
      alt: img.alt || '',
      href: img.href,
    }));

  return (
    <RollingImageMarquee images={mappedImages} speed={speed} height={height} />
  );
};
