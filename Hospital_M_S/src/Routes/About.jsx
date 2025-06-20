import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../assets/img/about.png';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  return (
    <>

      <section className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50 pt-24 pb-20">
       
        <div data-aos="fade-down" className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            About City Hospital
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto mt-3"></div>
        </div>

        <div
          data-aos="flip-up"
          className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 flex flex-col items-center"
        >
          <img
            data-aos="fade-up-left"
            src={image}
            alt="City Hospital"
            className="w-2/3 md:w-1/2 h-auto rounded-2xl mb-8 shadow-lg"
          />

          <div className="space-y-5 text-center text-gray-700 px-4">
            <p className="text-lg">
              <span className="text-green-700 font-semibold">Welcome to City Hospital</span>, where our mission is to provide the highest quality healthcare services to our community. We are committed to ensuring the well-being and health of all our patients.
            </p>
            <p className="text-lg">
              Our <span className="text-teal-700 font-semibold">state-of-the-art facilities</span> and highly trained medical professionals are dedicated to offering comprehensive medical care, ranging from emergency services to specialized treatments.
            </p>
            <p className="text-lg">
              At City Hospital, we believe in the values of <span className="text-green-700 font-semibold">compassion</span>, <span className="text-teal-700 font-semibold">integrity</span>, and <span className="text-green-700 font-semibold">excellence</span>. We are constantly striving to improve our services and make healthcare more accessible to everyone. Thank you for trusting us with your health.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
