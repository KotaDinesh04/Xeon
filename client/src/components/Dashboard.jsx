import TotalBalanceBox from "./TotalBalanceBox";
import RecentTransactions from "./RecentTransactions";
import HeaderBox from "./HeaderBox";
import { useEffect, useState } from "react";
import axios from "axios";
import RightSidebar from "./RightSidebar";

const Dashboard = ({ type, title, subtext, user, accessToken }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactionAdded, setTransactionAdded] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get("http://localhost:3001/transdb", {
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

  const totalBanks = accounts.length;

  const totalCurrentBalance = accounts.reduce((total, account) => {
  const currentBalance = typeof account.balances.current === 'number' ? account.balances.current : 0;
  console.log("Account Current Balance:", currentBalance);
  return total + currentBalance;
}, 0);

  
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

            <TotalBalanceBox
              accounts={accounts}
              totalBanks={totalBanks}
              totalCurrentBalance={totalCurrentBalance}
              user={user}
            />
          </header>
        </header>
        <RecentTransactions transactions={transactionAdded} />
      </div>
      <RightSidebar />
    </section>
  );
};

export default Dashboard;
