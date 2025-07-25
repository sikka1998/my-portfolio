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

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  //handle form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({
      name: false,
      email: false,
      message: false,
    });
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = () => {
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
    const newErrors = {
      name: formInput.name.trim() === "",
      email: formInput.email.trim() === "",
      message: formInput.message.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);

    if (hasError) return;

    //EmailJS Integration
    sendEmail();
  };

  return (
    <motion.div
      className="mt-14"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h5 className="text-sm uppercase text-center text-[#2e1ad9] sm:text-white">Want to Know More?</h5>
      <p className="mt-1 text-5xl font-bold mb-4 text-center text-[#2e1ad9] sm:text-white">SAY HELLO!</p>
      <motion.section className="flex flex-col justify-center items-center md:flex-row md:items-start gap-7 p-10">
        {/* Left - Contact Info */}
        <div className="flex flex-row gap-5 px-10 flex-wrap sm:w-1/2 md:flex-col md:w-1/2 text-black text-start">
          {/* Email */}
          <ContactCard
            icon={<MdEmail size={28} color="blue" />}
            title="Email"
            content="sikkander1998@gmail.com"
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
          <form className="space-y-4 text-start" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formInput.name}
                  onChange={handleChange}
                  className={`w-full p-4 border-3 border-sky-500 text-sky-500 md:border-white md:text-white rounded text-lg mb-1 ${errors.name ? 'border-orange-600' : 'border-sky-300'}`}
                />
                {errors.name && (
                  <p className="text-orange-600 text-sm">Required Field!</p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formInput.email}
                  onChange={handleChange}
                  className={`w-full p-4 border-3 border-sky-500 text-sky-500 md:border-white md:text-white rounded text-lg mb-1 ${errors.email ? 'border-orange-600' : 'border-gray-300'}`}
                />
                {errors.email && (
                  <p className="text-orange-600 text-sm">Required Field!</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formInput.subject}
                onChange={handleChange}
                className={`w-full p-4 border-3 border-sky-500 text-sky-500 md:border-white md:text-white rounded text-lg mb-1`}
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formInput.message}
                onChange={handleChange}
                className={`w-full p-4 border-3 border-sky-500 text-sky-500 md:border-white md:text-white rounded text-lg mb-1 ${errors.message ? 'border-orange-600' : 'border-gray-300'}`}
              />
              {errors.message && (
                <p className="text-orange-600 text-sm">Required Field!</p>
              )}
            </div>
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
