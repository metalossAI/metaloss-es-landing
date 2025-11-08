import React from "react";
import { RichText } from '@payloadcms/richtext-lexical/react'

export interface FeatureItem {
  title: string;
  description?: any; // RichText content
  icon?: string; // Icon name or image URL
  image?: string;
}

export interface FeaturesProps {
  title?: string;
  subtitle?: string;
  description?: any; // RichText content
  features: FeatureItem[];
  layout?: 'grid' | 'list';
  columns?: '2' | '3' | '4';
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  description,
  features,
  layout = 'grid',
  columns = '3',
  className = "",
}) => {
  const getGridCols = () => {
    switch (columns) {
      case '2':
        return 'md:grid-cols-2';
      case '3':
        return 'md:grid-cols-2 lg:grid-cols-3';
      case '4':
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className={`container py-16 ${className}`.trim()}>
      {/* Header */}
      {(title || subtitle || description) && (
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {subtitle && (
            <p 
              data-aos="fade-up" 
              className="text-sm uppercase tracking-wider text-primary font-semibold mb-4"
            >
              {subtitle}
            </p>
          )}
          
          {title && (
            <h2 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
            >
              {title}
            </h2>
          )}
          
          {description && (
            <div 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="text-lg text-muted-foreground"
            >
              <RichText data={description} />
            </div>
          )}
        </div>
      )}

      {/* Features */}
      <div 
        className={`
          ${layout === 'grid' 
            ? `grid grid-cols-1 ${getGridCols()} gap-8` 
            : 'space-y-8'
          }
        `}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`
              ${layout === 'grid' 
                ? 'text-center' 
                : 'flex flex-col md:flex-row items-start gap-6'
              }
            `}
          >
            {/* Icon/Image */}
            {(feature.icon || feature.image) && (
              <div className={`
                ${layout === 'grid' 
                  ? 'mx-auto mb-4' 
                  : 'flex-shrink-0'
                }
              `}>
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : feature.icon ? (
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-primary">{feature.icon}</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Content */}
            <div className={layout === 'grid' ? '' : 'flex-1'}>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              {feature.description && (
                <div className="text-muted-foreground">
                  <RichText data={feature.description} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
