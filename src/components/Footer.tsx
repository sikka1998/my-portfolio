import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="w-full bg-white text-black py-4 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>Copyright © 2025 | All Rights Reserved.</p>
        <button
          className="flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          onClick={() => handleClick()}
        >
          Back to top <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
