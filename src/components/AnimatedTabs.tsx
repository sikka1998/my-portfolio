import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import Header from "./Header";
import Skills from "./Skills";

const tabs = ["About", "Projects", "Skills", "Contact"];

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState<string>("About");

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex space-x-6 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-4 py-2 text-lg font-medium text-gray-700 dark:text-white cursor-pointer"
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

      <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
        {activeTab === "About" && (
          <>
            <Header />
            <Hero />
            <Skills />
          </>
        )}
        {activeTab === "Projects" && <p>This is the Projects section.</p>}
        {activeTab === "Skills" && <p>This is the Skills section.</p>}
        {activeTab === "Contact" && <p>This is the Contact section.</p>}
      </div>
    </div>
  );
}
