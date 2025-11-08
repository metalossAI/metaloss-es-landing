import React from "react";

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, imageUrl, children, className }) => {
  return (
    <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-border overflow-hidden hover:scale-[1.02] ${className || ''}`.trim()}>
      {imageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
        {description && <p className="text-muted-foreground mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
};
