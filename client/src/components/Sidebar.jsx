import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "/constants/index";
import Footer from "./Footer";
import { IoReorderThree } from "react-icons/io5";
import { useUser } from "./UserContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Set initial state to false to keep sidebar closed initially
  const pathname = window.location.pathname;
  const { name, email } = useUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <button
        className="fixed top-4 left-4 z-20 p-2 text-white bg-blue-600 rounded-lg md:hidden"
        onClick={toggleSidebar}
      >
        <IoReorderThree size={24} />
      </button>

      <section
        className={`fixed inset-y-0 left-0 z-10 flex flex-col w-64 bg-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex-shrink-0`}
      >
        <nav className="flex flex-col gap-4 p-4">
          <Link
            to="/"
            className="mb-12 cursor-pointer items-center gap-2 no-underline hidden md:flex "
          >
            <img
              src="/Noe.svg"
              width={36}
              height={36}
              alt="logo"
              className="ml-4 w-8 h-8"
            />
            <h1 className="ml-2 mt-2 sidebar-logo">Xeon</h1>
          </Link>
          {sidebarLinks.map((links) => {
            const isActive =
              pathname === links.route;
            return (
              <Link
                to={links.route}
                key={links.label}
                className={
                  isActive
                    ? "bg-bank-gradient sidebar-link no-underline"
                    : "sidebar-link no-underline"
                }
              >
                <div className="relative gap-3 flex flex-row">
                  <img
                    src={links.imgURL}
                    alt={links.label}
                    className={isActive ? " brightness-[3] invert-0 size-5" : "size-5"}
                  />
                <p
                  className={
                    isActive
                    ? "text-16 w-36 font-semibold mt- text-white"
                    : "text-16 w-36 font-semibold text-black-2 black font-inter"
                  }
                  >
                  {links.label}
                </p>
                </div>
              </Link>
            );
          })}
        </nav>
        <Footer name={name} email={email} />
      </section>

      <div
        className={`fixed inset-0 z-0 bg-black opacity-50 transition-opacity ${
          isOpen ? "block md:hidden" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
