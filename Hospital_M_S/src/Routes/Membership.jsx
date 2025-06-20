import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Membership = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const Enamount = 100;
  const Preamount = 79;
  const Buamount = 48;
  const type2 = "Business";
  const type1 = "Premium";
  const type3 = "Enterprise";

  return (
    <div>
      <section className="bg-gradient-to-br from-white via-green-50 to-teal-50 text-gray-700 body-font overflow-hidden">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1
              data-aos="fade-left"
              className="sm:text-4xl text-3xl font-bold title-font mb-2 text-teal-700"
            >
              Membership Plans
            </h1>
            <p
              data-aos="fade-right"
              className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-600"
            >
              Choose a plan that fits your healthcare needs. We offer both Free
              and Premium plans with Monthly and Annual billing options.
            </p>
            <div
              data-aos="fade-up"
              className="flex mx-auto border-2 border-teal-700 rounded overflow-hidden mt-6"
            >
              <button className="py-1 px-4 bg-teal-700 text-white focus:outline-none">
                Monthly
              </button>
              <button className="py-1 px-4 text-teal-700 hover:bg-teal-100 focus:outline-none">
                Annually
              </button>
            </div>
          </div>
          </div>
          <div className="flex flex-wrap -mt-28 p-8" data-aos="fade-down">
            {/* BASIC PLAN */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-gray-700">
                  BASIC
                </h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  Free
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Access to Book Appointments
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Basic Health Tips
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Limited Access to Specialists
                </p>
                <button className="flex items-center mt-auto text-white bg-green-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-700 rounded shadow transition">
                  Choose Plan
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">
                  Access basic medical services and appointment booking.
                </p>
              </div>
            </div>

            {/* PREMIUM PLAN */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-4 border-teal-700 shadow-lg bg-white flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  POPULAR
                </span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-teal-700">
                  PREMIUM
                </h2>
                <h1 className="text-5xl text-teal-800 leading-none flex items-center pb-4 mb-4 border-b border-teal-300">
                  <span>$79</span>
                  <span className="text-lg ml-1 font-normal text-teal-500">/mo</span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-teal-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Unlimited Appointments
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-teal-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Priority Access to Specialists
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-teal-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Access to Premium Health Resources
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-teal-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Exclusive Discounts on Services
                </p>
                <Link
                  to={`/checkout?amount=${Preamount}&type=${type1}`}
                  className="flex items-center mt-auto text-white bg-teal-700 border-0 py-2 px-4 w-full focus:outline-none hover:bg-teal-600 rounded shadow transition"
                >
                  Choose Plan
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-3">
                  Get the most out of our healthcare services with priority
                  access and more.
                </p>
              </div>
            </div>

            {/* BUSINESS PLAN */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-green-600 flex flex-col relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-green-700">
                  BUSINESS
                </h2>
                <h1 className="text-5xl text-green-800 leading-none flex items-center pb-4 mb-4 border-b border-green-300">
                  <span>$48</span>
                  <span className="text-lg ml-1 font-normal text-green-500">/mo</span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Health Coverage for Teams
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  On-site Medical Services
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-400 text-white rounded-full flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                  Custom Health Plans
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-400 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Dedicated Account Manager
                </p>
                <Link
                  to={`/checkout?amount=${Buamount}&type=${type2}`}
                  className="flex items-center mt-auto text-white bg-green-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-700 rounded shadow transition"
                >
                  Choose Plan
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-3">
                  Ideal for companies and organizations seeking comprehensive
                  health services.
                </p>
              </div>
            </div>

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-green-700 flex flex-col relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-green-800">
                  ENTERPRISE
                </h2>
                <h1 className="text-5xl text-green-900 leading-none flex items-center pb-4 mb-4 border-b border-green-300">
                  <span>$100</span>
                  <span className="text-lg ml-1 font-normal text-green-600">/mo</span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  All Business Plan Features
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  24/7 Healthcare Access
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Customized Wellness Programs
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  Regular Health Assessments
                </p>
                <Link
                  to={`/checkout?amount=${Enamount}&type=${type3}`}
                  className="flex items-center mt-auto text-white bg-green-700 border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-800 rounded shadow transition"
                >
                  Choose Plan
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-3">
                  Perfect for large enterprises requiring extensive healthcare
                  services.
                </p>
              </div>
            </div>
          </div>

      </section>
        <div className="container mx-auto p-8 bg-gradient-to-tr from-teal-100 via-green-100 to-teal-100 rounded-lg shadow-lg -mt-1">
          <h1
            data-aos="zoom-in"
            className="text-3xl font-bold text-center text-green-700 mb-8"
          >
            Payment Options
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {/* Credit/Debit Card Option */}
            <div data-aos="zoom-in-left" className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-300 hover:shadow-xl transition-shadow duration-300">
                <img
                  src="http://bptccul.com/wp-content/uploads/2021/12/Visa.png"
                  alt="Credit/Debit Card"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  Credit/Debit Card
                </h2>
                <p className="text-gray-600 mb-4">
                  Pay securely using your credit or debit card.
                </p>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                  Choose Card
                </button>
              </div>
            </div>

            {/* PayPal Option */}
            <div data-aos="zoom-in-left" className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-300 hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_scale.size_1028x578.v1602794215.png"
                  alt="PayPal"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  PayPal
                </h2>
                <p className="text-gray-600 mb-4">
                  Use your PayPal account for a fast and secure payment.
                </p>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                  Choose PayPal
                </button>
              </div>
            </div>

            {/* Bank Transfer Option */}
            <div data-aos="zoom-in-left" className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-300 hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://img.freepik.com/free-vector/bank-building-with-cityscape_1284-52265.jpg?w=360&t=st=1721757548~exp=1721758148~hmac=de9a03eb2b336e760bf282a81b513c67a2b52e3ffa82086ef00234e47622e86e"
                  alt="Bank Transfer"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  Bank Transfer
                </h2>
                <p className="text-gray-600 mb-4">
                  Transfer directly from your bank account.
                </p>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                  Choose Bank Transfer
                </button>
              </div>
            </div>

            {/* eSewa Option */}
            <div data-aos="zoom-in-left" className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-300 hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://cdn.esewa.com.np/ui/images/esewa_og.png?500"
                  alt="eSewa"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  eSewa
                </h2>
                <p className="text-gray-600 mb-4">
                  Transfer from your eSewa account for national use.
                </p>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                  Choose eSewa
                </button>
              </div>
            </div>

            {/* Khalti Option */}
            <div data-aos="zoom-in-right" className="w-full md:w-1/3 p-4">
              <div className="bg-white shadow-md rounded-lg p-6 text-center border border-green-300 hover:shadow-xl transition-shadow duration-300">
                <img
                  src="https://cdn-images-1.medium.com/max/1197/1*xqUNa2hUbiis04Z2XTr4Jw.png"
                  alt="Khalti"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  Khalti
                </h2>
                <p className="text-gray-600 mb-4">
                  Transfer directly from your Khalti account. One of the most used
                  methods to transfer funds.
                </p>
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
                  Choose Khalti
                </button>
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}
export default Membership;
