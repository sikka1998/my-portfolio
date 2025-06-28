import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
  icon: ReactNode;
  colorClass?: string;
}

const TimelineCard = ({ year, title, description, icon, colorClass = "bg-indigo-600" }: TimelineCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="relative bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-300"
    >
      {/* Icon Dot */}
      <div className={`absolute -left-7 top-6 w-6 h-6 ${colorClass} text-white rounded-full flex items-center justify-center shadow`}>
        {icon}
      </div>

      <h4 className="text-xl font-bold text-[#2e1ad9]">{year}</h4>
      <h5 className="text-lg font-semibold mt-1 text-gray-700">{title}</h5>
      <p className="text-gray-600 mt-1 text-sm">{description}</p>
    </motion.div>
  );
};

export default TimelineCard;
