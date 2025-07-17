import Education from "./Education";
import Experience from "./Experience";

const EducationExperienceSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4 mt-10">
      <h2 className="text-center text-4xl font-bold mb-12 text-lime-500">Education & Experience</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <Education />
        <Experience />
      </div>
    </section>
  );
};

export default EducationExperienceSection;