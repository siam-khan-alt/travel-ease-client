import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaRegEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import Swal from 'sweetalert2';
import Motions from '../../Component/Motions';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonColor: '#E07A5F',
            background: document.documentElement.classList.contains('dark') ? '#0F172A' : '#FFFFFF',
            color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#3D405B',
        });

        e.target.reset();
    };

    return (
        <Motions className="min-h-screen bg-[#F4F1DE] dark:bg-[#1E293B] py-10 px-4">
            <div className="max-w-5xl mx-auto">
                    <h2 className="main-heading mb-7 ">
                        Contact Us
                    </h2>
                

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-4">
                        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl shadow-md border-l-4 border-[#E07A5F]">
                            <div className="flex items-center gap-4">
                                <div className="text-[#E07A5F] text-xl bg-[#F4F1DE] dark:bg-[#1E293B] p-3 rounded-lg">
                                    <FaPhone />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
                                    <p className="text-[#3D405B] dark:text-gray-200 font-semibold">+880 1881361160</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl shadow-md border-l-4 border-[#E07A5F]">
                            <div className="flex items-center gap-4">
                                <div className="text-[#E07A5F] text-xl bg-[#F4F1DE] dark:bg-[#1E293B] p-3 rounded-lg">
                                    <FaRegEnvelope />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                                    <p className="text-[#3D405B] dark:text-gray-200 font-semibold truncate">nssiam99@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl shadow-md border-l-4 border-[#E07A5F]">
                            <div className="flex items-center gap-4">
                                <div className="text-[#E07A5F] text-xl bg-[#F4F1DE] dark:bg-[#1E293B] p-3 rounded-lg">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
                                    <p className="text-[#3D405B] dark:text-gray-200 font-semibold">Gofforgaoun, Mymensingh</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-[#3D405B] dark:bg-[#0F172A] rounded-xl shadow-md text-center">
                            <p className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Connect With Us</p>
                            <div className="flex justify-center gap-4">
                                <a href="https://github.com/siam-khan-alt" target="_blank" rel="noreferrer" className="text-white hover:text-[#E07A5F] transition-colors"><FaGithub size={22}/></a>
                                <a href="https://www.linkedin.com/in/siam-khan-sp99/" target="_blank" rel="noreferrer" className="text-white hover:text-[#E07A5F] transition-colors"><FaLinkedinIn size={22}/></a>
                                <a href="https://www.facebook.com/profile.php?id=100078237812772" target="_blank" rel="noreferrer" className="text-white hover:text-[#E07A5F] transition-colors"><FaFacebookF size={22}/></a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 p-6 md:p-8 bg-white dark:bg-[#0F172A] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E07A5F] outline-none transition-all"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E07A5F] outline-none transition-all"
                                    required
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E07A5F] outline-none transition-all"
                                required
                            />

                            <textarea
                                placeholder="How can we help you?"
                                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#E07A5F] outline-none transition-all"
                                rows={5}
                                required
                            />

                            <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-lg uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Motions>
    );
};

export default Contact;