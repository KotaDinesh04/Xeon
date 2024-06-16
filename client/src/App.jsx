// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useUser } from '../src/components/UserContext';
import { Outlet } from 'react-router-dom';
import './globals.css';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  axios.defaults.baseURL = 'http://localhost:3001';

  useEffect(() => {
    async function fetch() {
      const token = localStorage.getItem('token');
      if (token) {
          axios.get('/verifyToken', {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res)=>{
          console.log(res.data);
          if (res.data.valid) {
            console.log(res.data);
          } else {
            navigate('/');
          }
        }
       ). catch ((error)=> {
        console.log(error);
          navigate('/');
        }); 
      }
    }

    fetch();
  }, [navigate]);

  return (
    <div className="flex h-screen w-full font-inter gap-2 sm:gap-0">
      <Sidebar />
      <div className="flex-grow pt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
