import TimelineCard from './TimelineCard';
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
    return(
        <div className="relative pl-6 border-l-2 border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-white border-1 border-white-900">Experience</h3>
          <div className='mb-6'>
          <TimelineCard
            year="June 2022 - Present"
            title="Frontend Developer"
            description="Novopay - Web App banking frontend"
            icon={<FaBriefcase size={12} />}
            colorClass="bg-lime-500"
          />
          </div>
        </div>
    )
}

export default Experience;