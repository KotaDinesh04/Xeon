/* eslint-disable react/prop-types */

import TotalBalanceBox from "./TotalBalanceBox";
import RecentTransactions from "./RecentTransactions";
import HeaderBox from "./HeaderBox";
import { useEffect, useState } from "react";
import axios from "axios";
import RightSidebar from "./RightSidebar";
 

const Dashboard = ({ type, title, subtext, user, accessToken }) => {
  const [accounts,setAccounts] = useState([]);
  const [transactionAdded,setTransactionAdded] = useState([]);
  const [data , setData] = useState({});
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get("http://localhost:3001/transdb", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("success", res.data);
        setData(res.data);
        setAccounts(res.data.accounts);
        setTransactionAdded(res.data.added);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [accessToken]);
  return (
    //Removed this bcoz main width is effected.
    //flex flex-row gap-6 relative
    // <section className="flex flex-row gap-6 relative home-content">
    <section className="home">
      <div className="home-content">
        {/* <header className="flex flex-col "> */}
        <header className="home-header">
          <header className="header-box">
            <HeaderBox
              title={title}
              type={type}
              subtext={subtext}
              user={user}
            />

            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
              user = {user}
            />
          </header>
        </header>
        <RecentTransactions transactions={transactionAdded} />
      </div>
      <RightSidebar/>
    </section>
  );
};

export default Dashboard;
