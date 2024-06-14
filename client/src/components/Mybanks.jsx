import Sidebar from './Sidebar';
import Bank from './MyBankAccounts'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

const Mybanks = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user , setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() { 
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify the token
          const res = await axios.get('/verifyToken', { 
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (res.data.valid) {
            setLoggedIn({ firstName: res.data.user.email, id: res.data.user.id });
            console.log("The Data in app.js: " + res.data.user.email);

            // Fetch user data using the verified user ID
            const response = await axios.get("/db", { 
              params: { id: res.data.user.id } 
            });

            setAccessToken(response.data.accessToken);
            setUser(response.data.name);
            console.log("User: ", response.data.accessToken);
          } else {
            navigate('/');
          }
        } catch (error) {
          navigate('/');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/');
        setLoading(false);
      }
    }

    fetch();
  }, [navigate]);

  if (loading) return null;
  return (
    <section className='flex gap-4'>
        <Sidebar />
        <Bank
           type="greeting"
           title="Welcome"
           user={user}
           accessToken={accessToken}
           subtext="Access and manage your account and transactions efficiently."


        />
    </section>
  )
}

export default Mybanks