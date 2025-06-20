import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ isStaff }) => {
  return (
    <footer className="text-white body-font bg-teal-700">
      <div className="container px-5 py-16 mx-auto flex md:items-start md:flex-row flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 mx-auto md:mx-0 text-center md:text-left">
          <a className="flex title-font font-medium items-center justify-center md:justify-start text-white">
            <img
              src="https://img.freepik.com/free-vector/hospital-illustration-with-green-leafs_1394-713.jpg?t=st=1721709848~exp=1721713448~hmac=85609a8e7bd54ec36582d45e518306abd247a39d041a2c661254c1d7b64c2494&w=360"
              className="h-12 w-12 rounded-full"
              alt="hospital logo"
            />
            <span className="ml-3 text-xl font-bold text-green-300">City Hospital</span>
          </a>
          <p className="mt-2 text-sm text-green-100 italic">
            Quality Care, Trusted Expertise.
          </p>
        </div>

        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 mt-10 md:mt-0 text-center md:text-left">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
            <h2 className="title-font font-semibold text-green-100 text-sm mb-3">Hospital</h2>
            <nav className="list-none">
              <li>
                <Link to="/doctor/login" className="text-green-50 hover:text-white">Doctor</Link>
              </li>
              {isStaff === 'staff' && (
                <li>
                  <Link to="/staff/" className="text-green-50 hover:text-white">Staff</Link>
                </li>
              )}
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
            <h2 className="title-font font-semibold text-green-100 text-sm mb-3">Profile</h2>
            <nav className="list-none">
              <li>
                <Link to="/profile" className="text-green-50 hover:text-white">View Profile</Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
            <h2 className="title-font font-semibold text-green-100 text-sm mb-3">Memberships & Others</h2>
            <nav className="list-none">
              <li>
                <Link to="/membership" className="text-green-50 hover:text-white">Memberships</Link>
              </li>
              <li>
                <Link to="/insurance" className="text-green-50 hover:text-white">Insurance</Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-6">
            <h2 className="title-font font-semibold text-green-100 text-sm mb-3">About City Hospital</h2>
            <nav className="list-none">
              <li>
                <Link to="/about" className="text-green-50 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-50 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/location" className="text-green-50 hover:text-white">Our Location</Link>
              </li>
              <li>
                <Link to="/staff" className="text-green-50 hover:text-white">Staff</Link>
              </li>
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-teal-900">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center">
          <p className="text-green-100 text-sm text-center sm:text-left">
            © 2024 City Hospital —{' '}
            <a href="https://twitter.com/knyttneve" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:underline ml-1">
              @Ashim Gautam
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
            <a href="#" className="text-green-100 hover:text-white">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-green-100 hover:text-white">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="text-green-100 hover:text-white">
              <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a href="#" className="text-green-100 hover:text-white">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
