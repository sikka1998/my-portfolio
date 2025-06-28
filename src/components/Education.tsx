import TimelineCard from './TimelineCard';
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {

    return(
        <div className="relative pl-6 border-l-2 border-gray-300">
          <h3 className="text-2xl font-semibold mb-6 text-lime-500">Education</h3>
          <div className='mb-6'>
          <TimelineCard
            year="2020"
            title="Bachelor’s Degree"
            description="Electronics & Communication - Karpagam College Of Engineering"
            icon={<FaGraduationCap size={12} />}
            colorClass="bg-indigo-600"
          />
          </div>
          <div className='mb-6'>
          <TimelineCard
            year="2016"
            title="Higher Secondary"
            description="KCM Matriculation School"
            icon={<FaGraduationCap size={12} />}
            colorClass="bg-indigo-600"
          />
          </div>
        </div>
    )
}

export default Education
