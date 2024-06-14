import PaymentFund from "./PaymentFund"
import Sidebar from "./Sidebar"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

const Payment = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/verifyToken', { 
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.valid) {
          setLoggedIn({ firstName: res.data.user.email }); 
        } else {
          navigate('/');
        }
      })
      .catch(() => {
        navigate('/');
      })
      .finally(() => {
        setLoading(false); 
      });
    } else {
      navigate('/');
      setLoading(false); 
    }
  }, [navigate]);

  if (loading) return null;
  return (
    <section className="flex gap-4">
        <Sidebar/>
        <PaymentFund/>
    </section>
  )
}

export default Payment