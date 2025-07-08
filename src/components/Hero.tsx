import { motion } from "framer-motion";
import profileImg from "../assets/profileq.jpg";
import Button from "./Button";
import { useState } from "react";
import HireMeModal from "./HireMeModal";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import { useTypewriter } from "../custom_hooks/useTypeWriter";

export default function Hero() {
  const typedText = useTypewriter(["Frontend", "Developer."], 80, 3000);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 md:mt-24">
      <div className="flex-1 text-left w-full">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="heading-accent text-[24px] md:text-3xl whitespace-pre-line leading-snug 
             w-[14rem] md:w-[18rem] min-h-[5rem] inline-block"
        >
          {typedText}
          <span className="animate-pulse">|</span>
        </motion.h1>

        <p className="mt-6 max-w-md text-lg">
          I like to craft solid and scalable frontend products with great user
          experiences.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="highlight-text">
            Highly skilled at progressive enhancement, design systems & UI
            Engineering.
          </p>
          <p className="highlight-text">
            Empowering fintech startups with solid frontends and smooth user
            journeys since 2022.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-12">
          <Button variant="download">
            <HiOutlineDocumentDownload size={24} color="white" />
            Get CV
          </Button>
          <Button setModalOpen={setModalOpen}>
            <FaHandshake size={24} color="white" />
            Hire Me</Button>
          <HireMeModal
            isOpen={isModalOpen}
            onRequestClose={() => setModalOpen(false)}
          />
        </div>
      </div>

      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <motion.img
          src={profileImg}
          alt="Profile"
          className="profile-img"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
}
