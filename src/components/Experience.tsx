import TimelineCard from './TimelineCard';
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
  const exp = [{
    id: 1,
    year: "Sep 2025 - Feb 2026",
    title: "Senior Frontend Developer",
    description: "Jeeva AI - AI Powered CRM Platform",
    icon: <FaBriefcase size={12} />,
    colorClass: "bg-lime-500"
  }, {
    id: 2,
    year: "June 2022 - July 2025",
    title: "Frontend Developer",
    description: "Novopay - Loan Management System Banking Platform",
    icon: <FaBriefcase size={12} />,
    colorClass: "bg-lime-500"
  }]
  return (
    <div className="relative pl-6 border-l-2 border-gray-300">
      <h3 className="text-2xl font-semibold mb-6 text-white border-1 border-white-900">Experience</h3>
      <div className='mb-6'>
        {exp.map(e => (
          <TimelineCard
            key={e.id}
            year={e.year}
            title={e.title}
            description={e.description}
            icon={e.icon}
            colorClass={e.colorClass}
          />
        ))}
      </div>
    </div>
  )
}

export default Experience;