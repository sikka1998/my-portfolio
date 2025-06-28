import TimelineCard from './TimelineCard';
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
    return(
        <div className="relative pl-6 border-l-2 border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-[#2e1ad9]">Experience</h3>
          <div className='mb-6'>
          <TimelineCard
            year="June 2022 - Present"
            title="Frontend Developer"
            description="Novopay - Mobile banking frontend"
            icon={<FaBriefcase size={12} />}
            colorClass="bg-lime-500"
          />
          </div>
        </div>
    )
}

export default Experience;