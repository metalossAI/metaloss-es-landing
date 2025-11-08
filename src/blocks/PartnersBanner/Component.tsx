import React from 'react';
import { Media } from '@/payload-types';

export type Partner = {
  logo?: Media;
  name?: string;
  url?: string;
};

export type PartnersBannerProps = {
  partners?: Partner[];
};

export const PartnersBanner: React.FC<PartnersBannerProps> = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="container text-center w-full py-6">
      <h1 data-aos="fade-up" className="text-2xl font-cursive">Programs</h1>
      <br />
      <div className="mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 sm:overflow-x-auto">
          {partners.map((partner, idx) => (
            <a
              key={idx}
              href={partner.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[120px] h-20 px-4"
              title={partner.name || ''}
              data-aos="fade-out"
              data-aos-delay={idx * 100}
            >
              {partner.logo && typeof partner.logo === 'object' && 'url' in partner.logo ? (
                <img
                  src={partner.logo.url as string}
                  alt={partner.name || 'Partner Logo'}
                  className="h-16 object-contain"
                  style={{ maxWidth: 160 }}
                />
              ) : (
                <span className="text-gray-400">No Logo</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};