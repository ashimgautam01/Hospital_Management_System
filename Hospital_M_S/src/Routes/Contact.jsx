import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../Components/Footer';

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true
        });
    }, []);

    return (
        <div>
            <div className="flex justify-center py-20">
                <img data-aos="fade-up" className="w-auto h-auto"
                    src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148889375.jpg?t=st=1721841000~exp=1721844600~hmac=8091985bdaf46b87d8ca8030155402e7dac445fba3896a3c94db3a708e5f5ec6&w=360" />
            </div>

            <div className="max-w-5xl max-lg:max-w-3xl py-5 mx-auto bg-white font-[sans-serif] mb-5">
                <div className="text-center px-6">
                    <h2 className="text-teal-800 text-3xl font-extrabold">Contact Us</h2>
                    <p data-aos="zoom-in" className="text-sm text-green-600 mt-4 italic">
                        Have any issue or need help or any technical support?
                    </p>
                </div>

                <div data-aos="flip-up" className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(13,148,136,0.3)] rounded-lg mt-12">
                    <div className="bg-[#01312b] rounded-lg p-6 h-full max-lg:order-1">
                        <h2 className="text-xl text-white">Contact Information</h2>
                        <p className="text-sm text-green-300 mt-4">Have any issue or need help or any technical support?</p>

                        <ul data-aos="fade-down" className="mt-16 space-y-8 text-green-200">
                             <li className="flex items-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff'
                                    viewBox="0 0 479.058 479.058">
                                    <path d="..." />
                                </svg>
                                <span className="text-sm text-green-100 ml-4">cityhospital10@gmail.com</span>
                            </li>

                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' viewBox="0 0 482.6 482.6">
                                    <path d="..." />
                                </svg>
                                <span className="text-sm text-green-100 ml-4">+977 9864452384</span>
                            </li>

                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' viewBox="0 0 368.16 368.16">
                                    <path d="..." />
                                </svg>
                                <span className="text-sm text-green-100 ml-4">Pokhara-1, Bagar</span>
                            </li>
                        </ul>

                         <ul className="flex flex-wrap gap-4 mt-16">
                            {['facebook', 'linkedin', 'instagram'].map((_, i) => (
                                <li key={i} className="bg-green-800 hover:bg-green-900 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 lg:col-span-2">
                        <form>
                            <div className="grid sm:grid-cols-2 gap-8"> 
                                {['First Name', 'Last Name', 'Phone No.', 'Email'].map((label, idx) => (
                                    <div key={idx} className="relative flex items-center">
                                        <input type={label === 'Email' ? 'email' : 'text'} placeholder={label}
                                            className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-teal-500 focus:border-green-500 outline-none" />
                                    </div>
                                ))}
 
                                <div className="relative flex items-center sm:col-span-2">
                                    <textarea placeholder="Write Message"
                                        className="px-2 pt-3 bg-white w-full text-sm text-gray-800 border-b border-teal-500 focus:border-green-500 outline-none"></textarea>
                                </div>
 
                                <div className="col-span-full">
                                    <h6 className="text-sm text-gray-800">Select Subject</h6>
                                    <div className="flex max-lg:flex-col gap-6 mt-4">
                                        {['General Inquiry', 'Technical Support', 'Website Feedback'].map((item, idx) => (
                                            <div className="flex items-center" key={item}>
                                                <input id={`radio${idx + 1}`} type="radio" name="value1" className="hidden peer" defaultChecked={idx === 0} />
                                                <label htmlFor={`radio${idx + 1}`}
                                                    className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-teal-800 rounded-full overflow-hidden">
                                                    <span className="border-[4px] border-teal-700 rounded-full w-full h-full"></span>
                                                </label>
                                                <p className="text-sm text-gray-500 ml-4">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
 
                            <button type="button"
                                className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3 tracking-wide text-white bg-green-700 hover:bg-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2" viewBox="0 0 548.244 548.244">
                                    <path d="..." />
                                </svg>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
