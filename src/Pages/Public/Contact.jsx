import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaRegEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaPaperPlane, FaHeadset } from "react-icons/fa";
import Swal from 'sweetalert2';
import Motions from '../../Component/Motions';
import useAxios from '../../Hooks/useAxios';

const Contact = () => {
    const instanceAxios=useAxios()
    const handleSubmit = async(e) => {
       e.preventDefault();
    const form = e.target;
    const name = form.name.value; 
    
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const contactData = { name, email, subject, message };

    try {
        const res = await instanceAxios.post("/contacts", contactData);
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Message Received!',
                text: 'Our concierge will get back to you shortly.',
                icon: 'success',
                confirmButtonColor: 'var(--primary)',
                background: 'var(--card-bg)',
                color: 'var(--text-main)',
            });
            form.reset();
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    }
    };

    return (
        <div className="bg-[var(--bg-main)] min-h-screen py-20 px-6">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <Motions className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4 text-[var(--primary)]">
                        <FaHeadset className="text-2xl" />
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">24/7 Concierge Service</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl main-heading uppercase">Get In Touch</h2>
                    <div className="w-16 h-[2px] bg-[var(--primary)] mx-auto mt-4"></div>
                </Motions>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Contact Info Cards */}
                    <Motions className="lg:col-span-4 space-y-6">
                        {[
                            { icon: <FaPhone />, label: "Call Us", value: "+880 1881361160" },
                            { icon: <FaRegEnvelope />, label: "Email Us", value: "nssiam99@gmail.com" },
                            { icon: <FaMapMarkerAlt />, label: "Location", value: "Gafargaon, Mymensingh" }
                        ].map((info, index) => (
                            <div key={index} className="p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--primary)]/10 shadow-md group hover:border-[var(--primary)]/40 transition-all duration-500">
                                <div className="flex items-center gap-5">
                                    <div className="text-[var(--primary)] text-xl bg-[var(--primary)]/10 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest mb-1">{info.label}</p>
                                        <p className="text-[var(--text-main)] font-semibold font-poppins">{info.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Social Connect */}
                        <div className="p-8 bg-[var(--card-bg)]  rounded-2xl shadow-md text-center border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                            <p className="text-[var(--primary)] text-[10px] font-bold mb-6 uppercase tracking-[0.3em] relative z-10">Connect With Our Network</p>
                            <div className="flex justify-center gap-6 relative z-10">
                                <a href="https://github.com/siam-khan-alt" target="_blank" rel="noreferrer" className="text-[var(--primary)] transition-all hover:-translate-y-1"><FaGithub size={24}/></a>
                                <a href="https://www.linkedin.com/in/siam-khan-sp99/" target="_blank" rel="noreferrer" className="text-[var(--primary)] transition-all hover:-translate-y-1"><FaLinkedinIn size={24}/></a>
                                <a href="https://www.facebook.com/profile.php?id=100078237812772" target="_blank" rel="noreferrer" className="text-[var(--primary)] transition-all hover:-translate-y-1"><FaFacebookF size={24}/></a>
                            </div>
                        </div>
                    </Motions>

                    {/* Contact Form */}
                    <Motions className="lg:col-span-8">
                        <div className="h-full w-full bg-[var(--card-bg)] rounded-2xl p-8 md:p-10 shadow-md">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1 text-[var(--text-main)]">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Siam Khan"
                                            className="w-full bg-[var(--bg-main)] border border-[var(--primary)]/10 text-[var(--text-main)] rounded-xl px-5 py-4 focus:border-[var(--primary)]/60 outline-none transition-all font-poppins text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1 text-[var(--text-main)]">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="example@mail.com"
                                            className="w-full bg-[var(--bg-main)] border border-[var(--primary)]/10 text-[var(--text-main)] rounded-xl px-5 py-4 focus:border-[var(--primary)]/60 outline-none transition-all font-poppins text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1 text-[var(--text-main)]">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Inquiry about Luxury Fleet"
                                        className="w-full bg-[var(--bg-main)] border border-[var(--primary)]/10 text-[var(--text-main)] rounded-xl px-5 py-4 focus:border-[var(--primary)]/60 outline-none transition-all font-poppins text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1 text-[var(--text-main)]">Message</label>
                                    <textarea
                                        placeholder="How can we assist your journey?"
                                        className="w-full bg-[var(--bg-main)] border border-[var(--primary)]/10 text-[var(--text-main)] rounded-xl px-5 py-4 focus:border-[var(--primary)]/60 outline-none transition-all font-poppins text-sm min-h-[150px]"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-sm uppercase tracking-[0.2em] shadow-md">
                                    <FaPaperPlane className="text-xs" /> Send Message
                                </button>
                            </form>
                        </div>
                    </Motions>
                </div>
            </div>
        </div>
    );
};

export default Contact;