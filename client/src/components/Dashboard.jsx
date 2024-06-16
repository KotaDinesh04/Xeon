import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TotalBalanceBox from './TotalBalanceBox';
import RecentTransactions from './RecentTransactions';
import HeaderBox from './HeaderBox';
import { useUser } from './UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

axios.defaults.baseURL = import.meta.env.VITE_server;

const Dashboard = () => {
  const { name, accessToken} = useUser(); // Destructure setUser from useUser
  console.log("Dash board",name);
  const [accounts, setAccounts] = useState([]);
  const [transactionAdded, setTransactionAdded] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        if (accessToken) {
          const res = await axios.get('/transdb', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('Fetched Data:', res.data);
          setAccounts(res.data.accounts);
          setTransactionAdded(res.data.added);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        navigate('/');
      }
    };

    fetchTransaction();
  }, [navigate]);

  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExampleAutoplaying');
    if (carouselElement) {
      const bootstrapCarousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 4000,
        ride: 'carousel',
      });

      const handleSlide = (event) => {
        const newIndex = event.to;
        setActiveIndex(newIndex);
      };

      carouselElement.addEventListener('slid.bs.carousel', handleSlide);

      return () => {
        carouselElement.removeEventListener('slid.bs.carousel', handleSlide);
        bootstrapCarousel.dispose();
      };
    }
  }, [accounts]); // Only initialize carousel when accounts change

  const handleCarouselControl = (direction) => {
    const carouselElement = document.querySelector('#carouselExampleAutoplaying');
    if (carouselElement) {
      const carousel = window.bootstrap.Carousel.getInstance(carouselElement);
      if (direction === 'prev') {
        carousel.prev();
        setActiveIndex((activeIndex - 1 + accounts.length) % accounts.length);
      } else if (direction === 'next') {
        carousel.next();
        setActiveIndex((activeIndex + 1) % accounts.length);
      }
      carousel.cycle(); // Resume the autoplay
    }
  };

  const len = accounts.length;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            title={'Welcome'}
            type={'greeting'}
            subtext={'Banking Management'}
            name={name}
          />

          <div
            id="carouselExampleAutoplaying"
            className="carousel slide hidden sm:flex"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {accounts.map((account, index) => (
                <div
                  className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  key={index}
                >
                  <TotalBalanceBox
                    len={len}
                    account={account}
                    all={accounts}
                    name={name}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
              onClick={() => handleCarouselControl('prev')}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
              onClick={() => handleCarouselControl('next')}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </header>
        <RecentTransactions transactions={transactionAdded} />
      </div>
    </section>
  );
};

export default Dashboard;
