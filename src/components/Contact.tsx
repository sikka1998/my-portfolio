import { motion } from "framer-motion";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import ContactCard from "./ContactCard";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const SpinnerIcon = () => (
  <div className="flex items-center justify-center space-x-2">
    <FaSpinner className="animate-spin text-black text-xl" />
    <span className="text-black">Sending...</span>
  </div>
);

const Contact = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  //handle form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = () => {
    //EmailJS Integration
    setIsLoading(true);
    emailjs
      .send(
        "service_0mh6l8w", // from EmailJS
        "template_j8wxbvu", // from EmailJS
        formInput,
        "bYq7irL-ssvqaG9V1" // public key
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setFormInput({ name: "", email: "", subject: "", message: "" });
      })
      .catch((e) => {
        toast.error("Unable to send, please try again Later");
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //Form validation
    if (!formInput.name || !formInput.email || !formInput.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    sendEmail();
  };

  return (
    <motion.div
      className="mt-14"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h5 className="text-sm uppercase text-center">Have a question?</h5>
      <p className="mt-1 text-5xl font-bold mb-4 text-center">SAY HELLO!</p>
      <motion.section className="flex flex-col md:flex-row justify-center items-start gap-10 p-10">
        {/* Left - Contact Info */}
        <div className="space-y-6 w-full md:w-1/3 text-black text-start">
          {/* Email */}
          <ContactCard
            icon={<MdEmail size={28} color="blue" />}
            title="Email"
            content={<>sikkander1998@gmail.com</>}
          />
          {/* Phone */}
          <ContactCard
            icon={<MdPhone size={28} color="blue" />}
            title="Phone"
            content={
              <>
                +91 7010532010
                <br />
                +91 9003364657
              </>
            }
          />
          {/* Address */}
          <ContactCard
            icon={<MdLocationOn size={28} color="blue" />}
            title="Address"
            content={
              <>
                HSR Extension,
                <br />
                Bengaluru, Karnataka
              </>
            }
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-2/3">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formInput.name}
                className="w-full md:w-1/2 p-4 border rounded text-lg"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formInput.email}
                className="w-full md:w-1/2 p-4 border rounded text-lg"
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={formInput.subject}
              className="w-full p-4 border rounded text-lg"
              onChange={handleChange}
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formInput.message}
              className="w-full p-4 border rounded h-40 text-lg"
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white py-4 px-6 rounded w-full text-lg hover:bg-white hover:text-black transition cursor-pointer"
            >
              {isLoading ? <SpinnerIcon /> : "CLICK TO SUBMIT"}
            </button>
          </form>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;
