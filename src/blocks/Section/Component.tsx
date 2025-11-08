import React from "react";
import { RenderBlocks } from "../RenderBlocks";

export interface SectionProps {
  title: string;
  description?: string;
  blocks?: any[];
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  blocks = [],
  className = "",
}) => {
  return (
    <section className={`container py-16 ${className}`.trim()}>
      <h2 data-aos="fade-up" className="text-4xl mb-4 flex flex-wrap gap-x-2 text-foreground">{title}</h2>
      {description && (
        <p data-aos="fade-up" className="text-lg text-muted-foreground mb-8 flex flex-wrap gap-x-1">{description}</p>
      )}
      {blocks && blocks.length > 0 ? <RenderBlocks blocks={blocks} /> : null}
    </section>
  );
};

export default Section;
