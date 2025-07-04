import { useState } from "react";
import { motion } from "framer-motion";

type AnimatedTabsProps = {
  refs: {
    [key: string]: React.RefObject<HTMLElement>;
  };
};

const tabs = ["About", "Skills", "Experience", "Contact"];

export default function AnimatedTabs({ refs }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("About");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    refs[tab]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex md:space-x-6 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className="relative px-4 py-2 text-sm lg:text-lg font-medium text-white dark:text-white cursor-pointer"
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-1 bg-lime-500 rounded"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
