import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className='md:px-20 md:mt-6'>
      <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="heading-accent"
        >
           Mohamed Sikkander Iqbal
        </motion.h1>
    </header>
  );
}