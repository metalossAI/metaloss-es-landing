import React from "react";
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Button } from "@/components/ui/button";
import { CMSLink } from "@/components/Link";

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: any; // RichText content
  primaryCTA?: {
    label: string;
    type: 'reference' | 'custom';
    url?: string;
    reference?: any;
    newTab?: boolean;
  };
  secondaryCTA?: {
    label: string;
    type: 'reference' | 'custom';
    url?: string;
    reference?: any;
    newTab?: boolean;
  };
  backgroundImage?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  className = "",
}) => {
  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${className}`.trim()}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        </div>
      )}
      
      {/* Content */}
      <div className="container relative z-10 text-center py-20">
        {subtitle && (
          <p 
            data-aos="fade-up" 
            className="text-sm uppercase tracking-wider text-primary font-semibold mb-4"
          >
            {subtitle}
          </p>
        )}
        
        <h1 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight"
        >
          {title}
        </h1>
        
        {description && (
          <div 
            data-aos="fade-up" 
            data-aos-delay="200"
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            <RichText data={description} />
          </div>
        )}
        
        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <div 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {primaryCTA && (
              <CMSLink
                type={primaryCTA.type}
                url={primaryCTA.url}
                reference={primaryCTA.reference}
                newTab={primaryCTA.newTab}
                className="inline-flex"
              >
                <Button size="lg" className="px-8 py-3 text-lg">
                  {primaryCTA.label}
                </Button>
              </CMSLink>
            )}
            
            {secondaryCTA && (
              <CMSLink
                type={secondaryCTA.type}
                url={secondaryCTA.url}
                reference={secondaryCTA.reference}
                newTab={secondaryCTA.newTab}
                className="inline-flex"
              >
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  {secondaryCTA.label}
                </Button>
              </CMSLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
