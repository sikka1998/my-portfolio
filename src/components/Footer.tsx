import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.div className="my-0 mt-10 bg-white py-6 flex justify-between items-center text-black">
      <p className="ml-8">Copyright © 2025 | All Rights Reserved.</p>
      <motion.button
        className="flex items-center gap-2 cursor-pointer mr-8"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
        <FaArrowUp />
      </motion.button>
    </motion.div>
  );
};

export default Footer;
