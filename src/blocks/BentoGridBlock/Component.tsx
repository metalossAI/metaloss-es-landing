import React from "react";
import { cn } from "@/utilities/ui";
// You may need to adjust the import paths below to match your project structure
// import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
// import * as Icons from "@tabler/icons-react";
import { motion } from "framer-motion";

// Fallback icon if dynamic import fails
const FallbackIcon = () => <span className="h-4 w-4">🔲</span>;

// Utility to get icon component by name
const getIconComponent = (iconName: string) => {
  // You should map icon names from CMS to actual icon components here
  // Example: if (iconName === "clipboard") return <Icons.IconClipboardCopy ... />
  return <FallbackIcon />;
};

// Skeleton header examples (simplified, you can expand as needed)
const SkeletonOne = () => <div className="h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg" />;
const SkeletonTwo = () => <div className="h-20 bg-gray-200 rounded-lg" />;
const SkeletonThree = () => <div className="h-20 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg" />;
const SkeletonFour = () => <div className="h-20 bg-yellow-200 rounded-lg" />;
const SkeletonFive = () => <div className="h-20 bg-orange-200 rounded-lg" />;

const headerMap: Record<string, React.ReactNode> = {
  skeletonOne: <SkeletonOne />,
  skeletonTwo: <SkeletonTwo />,
  skeletonThree: <SkeletonThree />,
  skeletonFour: <SkeletonFour />,
  skeletonFive: <SkeletonFive />,
};

export interface BentoGridItem {
  title: string;
  description?: string;
  icon?: string; // icon name from CMS
  headerType?: string; // skeletonOne, skeletonTwo, ...
  className?: string;
}

export interface BentoGridBlockProps {
  items: BentoGridItem[];
  className?: string;
}

export const BentoGridBlock: React.FC<BentoGridBlockProps> = ({ items, className }) => {
  return (
    <div className={cn("max-w-4xl mx-auto grid md:auto-rows-[20rem] gap-4 grid-cols-1 md:grid-cols-3", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn("bg-white dark:bg-neutral-900 rounded-xl p-6 flex flex-col gap-4 shadow-md border border-neutral-100 dark:border-neutral-800 transition-all", item.className)}
        >
          <div className="flex items-center gap-2">
            {item.icon ? getIconComponent(item.icon) : <FallbackIcon />}
            <h3 className="font-semibold text-lg">{item.title}</h3>
          </div>
          <div className="text-neutral-600 dark:text-neutral-300 text-sm">{item.description}</div>
          <div className="flex-1 flex items-center justify-center">
            {item.headerType ? headerMap[item.headerType] : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGridBlock;
