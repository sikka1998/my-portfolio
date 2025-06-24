import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.div className="w-full mt-6 bg-black py-6 flex justify-around items-center text-white">
      <p>Copyright © 2025 | All Rights Reserved.</p>
      <motion.button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
        <FaArrowUp />
      </motion.button>
    </motion.div>
  );
};

export default Footer;
