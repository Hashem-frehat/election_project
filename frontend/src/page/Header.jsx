import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const nationalId = sessionStorage.getItem("national_id");
    if (nationalId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("national_id");
    setIsLoggedIn(false);
  };

  return (
    <header className="relative overflow-hidden h-16 bg-gradient-to-r from-green-500 via-black to-green-500">
      <nav className="relative z-20 container mx-auto px-4 h-full">
        <ul className="flex justify-center items-center space-x-8 rtl:space-x-reverse h-full">
          <li>
            {isLoggedIn ? (
              <button
                className="bg-black mr-[4rem] hover:scale-105 text-white font py-2 px-4 rounded-lg transition duration-300"
                onClick={handleLogout}
              >
                تسجيل خروج
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-white transition duration-300 text-lg font-bold"
              >
                <button className="bg-black mr-[4rem]  hover:scale-105 text-white font py-2 px-4 rounded-lg transition duration-300">
                  تسجيل دخول
                </button>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                ` text-white font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              النتائج للمحلية
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/partyresult"
              className={({ isActive }) =>
                ` text-white font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              النتائج للحزبية
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/type"
              className={({ isActive }) =>
                ` text-white font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              صوّت
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                ` text-white font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              خدماتنا
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/request"
              className={({ isActive }) =>
                ` text-white font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              قدم طلب ترشيح
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` text-white mr-[4rem] font-bold transition duration-300 ${
                  isActive ? "text-2xl" : "text-xl"
                }`
              }
            >
              الصفحة الرئيسية
            </NavLink>
          </li>
          <img src={logo} alt="Logo" className="w-24 h-20 " />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
