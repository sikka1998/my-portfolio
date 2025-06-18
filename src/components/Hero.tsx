import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 md:mt-3">
      <div className="flex-1 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="heading-accent"
        >
          Frontend<br />Developer.
        </motion.h1>

        <p className="mt-6 max-w-md text-lg">
          I like to craft solid and scalable frontend products with great user experiences.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="highlight-text">
            Highly skilled at progressive enhancement, design systems & UI Engineering.
          </p>
          <p className="highlight-text">
            Over a decade of experience building products for clients across several countries.
          </p>
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
