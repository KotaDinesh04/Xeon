import { HiOutlineLogout } from "react-icons/hi";

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ name,email, type = 'desktop' }) => {
const navigate = useNavigate();
  const handleLogOut = () => {
    
    navigate('/');
  };

  return (
    <footer className="footer mb-12">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl mt-3 font-bold text-gray-700">
          {name[0]}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className="text-14 truncate text-white font-semibold mt-1.5">
          {name}
        </h1>
      </div>

      <div className="footer_image " onClick={handleLogOut}>
      <HiOutlineLogout size={34}/>
      </div>
    </footer>
  );
};

export default Footer;
