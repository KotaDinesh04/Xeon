import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TotalBalanceBox from "./TotalBalanceBox";
import RecentTransactions from "./RecentTransactions";
import HeaderBox from "./HeaderBox";
import { useEffect, useState } from "react";
import axios from "axios";
import RightSidebar from "./RightSidebar";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

const Dashboard = ({ type, title, subtext, user, accessToken }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactionAdded, setTransactionAdded] = useState([]);
  const [data, setData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get("/transdb", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Fetched Data:", res.data);
        setData(res.data);
        setAccounts(res.data.accounts);
        setTransactionAdded(res.data.added);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [accessToken]);

  useEffect(() => {
    console.log("Accounts:", accounts);
  }, [accounts]);

  useEffect(() => {
    const carouselElement = document.querySelector('#carouselExampleAutoplaying');
    const bootstrapCarousel = new window.bootstrap.Carousel(carouselElement, {
      interval: 4000,
      ride: 'carousel'
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
  }, []);

  const handleCarouselControl = (direction) => {
    const carouselElement = document.querySelector('#carouselExampleAutoplaying');
    if (direction === 'prev') {
      carouselElement.carousel('prev');
      setActiveIndex((activeIndex - 1 + accounts.length) % accounts.length);
    } else if (direction === 'next') {
      carouselElement.carousel('next');
      setActiveIndex((activeIndex + 1) % accounts.length);
    }
    carouselElement.carousel('cycle'); // Resume the autoplay
  };

  const len = accounts.length;
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <header className="header-box">
            <HeaderBox
              title={title}
              type={type}
              subtext={subtext}
              user={user}
            />

            <div
              id="carouselExampleAutoplaying"
              className="carousel slide hidden sm:flex"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {accounts.map((account, index) => (
                  <div
                    className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                    key={index}
                  >
                    <TotalBalanceBox
                      len={len}
                      account={account}
                      all={accounts}
                      user={user}
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
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
                onClick={() => handleCarouselControl('next')}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </header>
        </header>
        <RecentTransactions transactions={transactionAdded} />
      </div>
    </section>
  );
};

export default Dashboard;
