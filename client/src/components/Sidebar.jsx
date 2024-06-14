import { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "/constants/index";
import Footer from "./Footer";
import './sidebar.css';
import { IoReorderThree } from "react-icons/io5";

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true); // Set initial state to false to keep sidebar closed initially
  const pathname = window.location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
      <IoReorderThree size={24}/>
      </button>
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className="mb-12 flex cursor-pointer items-center gap-2"
        >
          <img
            src="/Noe.svg"
            width={34}
            height={34}
            alt="logo"
            className="size-[32px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Xeon</h1>
        </Link>
        {sidebarLinks.map((links) => {
          const isActive =
            pathname === links.route || pathname.startsWith(`${links.route}/`);
          return (
            <Link
              to={links.route}
              key={links.label}
              className={
                isActive ? "bg-bank-gradient sidebar-link" : "sidebar-link"
              }
            >
              <div className="relative size-5">
                <img
                  src={links.imgURL}
                  alt={links.label}
                  className={isActive && "brightness-[3] invert-0"}
                />
              </div>
              <p
                className={
                  isActive
                    ? "sidebar-label text-white"
                    : "sidebar-label black font-inter"
                }
              >
                {links.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
