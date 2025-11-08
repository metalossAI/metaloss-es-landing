import React from "react";
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Button } from "@/components/ui/button";
import { CMSLink } from "@/components/Link";

export interface CTAProps {
  title: string;
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
  style?: 'default' | 'gradient' | 'minimal';
  backgroundImage?: string;
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  style = 'default',
  backgroundImage,
  className = "",
}) => {
  const getStyleClasses = () => {
    switch (style) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground';
      case 'minimal':
        return 'bg-muted/50';
      default:
        return 'bg-card border border-border';
    }
  };

  return (
    <section className={`container py-16 ${className}`.trim()}>
      <div className={`
        relative rounded-2xl p-8 md:p-12 lg:p-16 text-center overflow-hidden
        ${getStyleClasses()}
      `}>
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt="" 
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl" />
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 
            data-aos="fade-up"
            className={`
              text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight
              ${style === 'gradient' ? 'text-primary-foreground' : 'text-foreground'}
            `}
          >
            {title}
          </h2>
          
          {description && (
            <div 
              data-aos="fade-up" 
              data-aos-delay="100"
              className={`
                text-lg md:text-xl mb-8
                ${style === 'gradient' ? 'text-primary-foreground/90' : 'text-muted-foreground'}
              `}
            >
              <RichText data={description} />
            </div>
          )}
          
          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
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
                  <Button 
                    size="lg" 
                    className={`
                      px-8 py-3 text-lg
                      ${style === 'gradient' 
                        ? 'bg-background text-foreground hover:bg-background/90' 
                        : ''
                      }
                    `}
                    variant={style === 'gradient' ? 'secondary' : 'default'}
                  >
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
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className={`
                      px-8 py-3 text-lg
                      ${style === 'gradient' 
                        ? 'border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10' 
                        : ''
                      }
                    `}
                  >
                    {secondaryCTA.label}
                  </Button>
                </CMSLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
