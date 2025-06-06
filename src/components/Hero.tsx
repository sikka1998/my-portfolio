import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Hi, I'm Mohamed Sikkander Iqbal 👋
      </motion.h1>
      <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-600 dark:text-gray-300">
        A passionate Frontend Developer crafting clean, user-focused interfaces.
      </p>
      <a 
        href="#projects"
        className="mt-6 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        View Projects
      </a>
    </section>
  );
}
