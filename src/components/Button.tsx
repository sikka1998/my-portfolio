import { motion } from "framer-motion";

type ButtonProp = {
  children: React.ReactNode;
  variant?: "download" | "default";
};

const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/Mohamed_Sikkander_FE_Resume_TS.pdf";
  link.download = "Mohamed_Sikkander_FE_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Button = ({ children, variant = "default" }: ButtonProp) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.9 }}
      className="bg-lime-500 rounded-sm text-[#2e1ad9] font-semibold cursor-pointer py-1"
      initial={{ opacity: 0.5, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onClick={() => variant === "download" && downloadCV()}
    >
      {children}
    </motion.button>
  );
};

export default Button;
