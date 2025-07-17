import type { ReactNode } from "react";
import { motion } from "framer-motion";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  content: string | ReactNode;
};

const ContactCard = ({ icon, title, content }: ContactCardProps) => {
  return (
    <motion.div
      className={`flex bg-white shadow-md rounded p-4 items-start space-x-4 w-full  ${
        title === "Address" ? "hidden md:flex" : ""
      }`}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#fff",
      }}
    >
      <div className="text-white p-4 rounded flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col overflow-hidden">
        <h4 className="font-bold uppercase text-md">{title}</h4>
        <p className="text-pretty break-words text-[14px] text-gray-700">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default ContactCard;
