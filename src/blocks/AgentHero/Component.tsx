'use client'
import React from "react";

export type AgentHeroBlockProps = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string; // Target section or URL for CTA
  steps?: { label: string; desc?: string }[];
  cards?: {
    title: string;
    subtitle?: string;
    content?: string;
    image?: { url: string } | string;
  }[];
};

export const AgentHero: React.FC<AgentHeroBlockProps> = ({
  title,
  subtitle,
  ctaLabel = "Start building",
  ctaHref,
  steps = [],
  cards = [],
}) => {
  const [selectedStep, setSelectedStep] = React.useState(0);

  return (
    <section className="relative container justify-around rounded-xl w-full min-h-[600px] bg-transparent flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Left: Text and Steps */}
      <div className="flex flex-col px-4 py-12 md:w-1/2 w-full max-w-xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-left">
          <span className="text-primary dark:text-primary-light">{title}</span>
        </h1>
        {subtitle && <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-md">{subtitle}</p>}
        {ctaHref ? (
          <a
            href={ctaHref}
            className="bg-primary text-white dark:bg-primary-light dark:text-gray-900 px-6 py-2 rounded-lg font-semibold mb-8 w-fit shadow-lg hover:bg-primary/90 dark:hover:bg-primary-light/90 transition inline-block"
          >
            {ctaLabel}
          </a>
        ) : (
          <button
            onClick={() => {
              if (ctaHref) {
                document.getElementById(ctaHref)?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-primary text-white dark:bg-primary-light dark:text-gray-900 px-6 py-2 rounded-lg font-semibold mb-8 w-fit shadow-lg hover:bg-primary/90 dark:hover:bg-primary-light/90 transition"
            type="button"
          >
            {ctaLabel}
          </button>
        )}
        {/* Stepper */}
        <ol className="space-y-3 mt-6">
          {steps.map((step, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setSelectedStep(idx)}
              onClick={() => setSelectedStep(idx)}
              className={`flex items-start gap-3 cursor-pointer transition
                ${selectedStep === idx ? "bg-slate dark:bg-white/10 rounded-lg p-2 shadow" : ""}
              `}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded
                  ${selectedStep === idx ? "bg-primary dark:bg-primary-light text-white dark:text-gray-900" : "bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-white"} 
                  font-bold`}
              >
                {idx + 1}
              </span>
              <div>
                <div className="text-base font-semibold text-slate-900 dark:text-white">{step.label}</div>
                {step.desc && <div className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Flowchart Cards */}
        <div className="relative w-full max-w-xl h-full flex flex-col items-center justify-between">
          {cards[selectedStep] && (
              <div className="h-full rounded-xl bg-white/90 dark:bg-black/90 text-slate-800 dark:text-white p-4 shadow-lg text-xs border font-mono">
                {cards[selectedStep].image && (
                  <img
                    src={typeof cards[selectedStep].image === 'string'
                      ? cards[selectedStep].image
                      : cards[selectedStep].image.url}
                    alt={cards[selectedStep].title}
                    className="w-full h-full rounded-lg"
                  />
                )}
                {cards[selectedStep].subtitle && <div className="mb-2 text-slate-500 dark:text-slate-300">{cards[selectedStep].subtitle}</div>}
                {cards[selectedStep].content && <div className="text-slate-600 dark:text-slate-400">{cards[selectedStep].content}</div>}
              </div>
          )}
        </div>
    </section>
  );
};

export default AgentHero;
