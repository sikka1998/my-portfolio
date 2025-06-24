import type { ReactNode } from "react";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  content: string | ReactNode;
};

const ContactCard = ({ icon, title, content }: ContactCardProps) => {
  return (
    <div className="flex bg-white shadow-md rounded p-4 items-center">
      <div className="bg-black text-white p-4 rounded mr-4">
        {icon}
      </div>
      <div>
        <h4 className="font-bold uppercase text-sm">{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ContactCard;
