//import React from 'react';
import { useState ,useEffect} from "react";
import axios from "axios";
import BankCard from "./BankCard";
import HeaderBox from "./HeaderBox";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

const MyBankAccounts = ({ title, user, type, subtext , accessToken}) => {
  const [accounts , setAccounts] = useState([]);
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get("/transdb", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("success", res.data);
        setAccounts(res.data.accounts);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    fetchTransaction();
  }, [accessToken]);
  console.log(accounts);
  return (
    <div className="flex w-full md:w-3/4 p-4">
      <div className="my-banks">
        <HeaderBox title={title} user={user} subtext={subtext} type={type} />

        <div className="space-y-4">
          <h2 className="header-2">
              Your cards
          </h2>
          <div className= "flex flex-wrap gap-6">
          {accounts.map((account, index) => (

            <BankCard 
              key={index}
              account={account}
              userName={user}
            />
            
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBankAccounts;
