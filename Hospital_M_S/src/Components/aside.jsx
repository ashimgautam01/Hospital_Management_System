import React from "react";
import { NavLink } from "react-router-dom";

export const Aside = () => {
  return (
    <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60 overflow-y-auto">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <h1 className="text-xl font-bold leading-none">
              <NavLink to={'/'} className="text-teal-600 font-bold">City Hospital</NavLink>{" "}
              <span className="text-green-600">Staff</span>
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to={'/staff'}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl font-bold text-sm py-3 px-4 transition ${
                      isActive
                        ? 'bg-green-200 text-green-900'
                        : 'hover:bg-teal-100 text-gray-900'
                    }`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/staff/pharmacy"}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl font-bold text-sm py-3 px-4 transition ${
                      isActive
                        ? 'bg-green-200 text-green-900'
                        : 'hover:bg-teal-100 text-gray-900'
                    }`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
                  </svg>
                  Pharmacy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/staff/doctorchange"}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl font-bold text-sm py-3 px-4 transition ${
                      isActive
                        ? 'bg-green-200 text-green-900'
                        : 'hover:bg-teal-100 text-gray-900'
                    }`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                  </svg>
                  Doctors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/staff/lab"}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl font-bold text-sm py-3 px-4 transition ${
                      isActive
                        ? 'bg-green-200 text-green-900'
                        : 'hover:bg-teal-100 text-gray-900'
                    }`
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                  </svg>
                  Lab
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4 flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-teal-600 text-white hover:bg-teal-700 text-sm font-semibold transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
