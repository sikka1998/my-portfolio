import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt } from 'react-icons/fa';
import { SiTypescript } from "react-icons/si";

const Skills = () => {
  return (
    <section className="bg-white/85 text-white py-8 px-4 text-center rounded-xl mt-10">
      {/* Scroll icon & code tag */}
      <div className="flex flex-col items-center">
        <div className="w-5 h-10 border-2 border-[#2e1ad9] rounded-full mb-4 relative">
          <div className="w-1 h-1 bg-[#2e1ad9] rounded-full animate-bounce absolute top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className='flex items-center space-between'>
        <h2 className="text-3xl font-semibold text-[#2e1ad9]">Skills</h2>
        <div className="text-6xl text-lime-500 mb-2">&lt;/&gt;</div>
        </div>
        <p className="text-sm mt-4 text-[#2e1ad9] font-bold">I am Striving To Never Stop Learning and Improving</p>
      </div>

      {/* Category Cards */}
      <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="bg-[#2e1ad9] text-gray-900 px-6 py-4 rounded-md shadow-md w-64">
          <h3 className="text-xl font-bold text-white/90">Web Development</h3>
          {/* <p className="text-sm mt-2 text-white/90">HTML, CSS, JS, React</p> */}
        </div>
      </div>

      {/* Tech Icons */}
      <div className="mt-14 mb-6 grid grid-cols-2 sm:grid-cols-6 gap-4 justify-center">
        <div className="flex flex-col items-center">
          <FaHtml5 size={40} className="text-orange-500" />
          <p className="mt-2 text-orange-500 font-bold">HTML</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCss3Alt size={40} className="text-blue-500" />
          <p className="mt-2 text-blue-500 font-bold">CSS</p>
        </div>
        <div className="flex flex-col items-center">
          <FaJs size={40} className="text-yellow-500" />
          <p className="mt-2 text-yellow-500 font-bold">JS</p>
        </div>
        <div className="flex flex-col items-center">
          <FaReact size={40} className="text-cyan-500" />
          <p className="mt-2 text-cyan-500 font-bold">REACT</p>
        </div>
        <div className="flex flex-col items-center">
          <FaGitAlt size={40} className="text-orange-500" />
          <p className="mt-2 text-orange-500 font-bold">GIT</p>
        </div>
        <div className="flex flex-col items-center">
          <SiTypescript size={40} className="text-blue-500" />
          <p className="mt-2 text-blue-500 font-bold">Typescript</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
