//import React from 'react';
import { useState ,useEffect} from "react";
import axios from "axios";
import BankCard from "./BankCard";
import HeaderBox from "./HeaderBox";
import { useUser } from './UserContext';

/* axios.defaults.baseURL = "https://xeon-two.vercel.app"; */
axios.defaults.baseURL = import.meta.env.VITE_server;

const MyBankAccounts = () => {
  const {name ,accessToken} = useUser();
  console.log("MyBank :",name);
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
    <div className="flex">
      <div className="my-banks">
        <HeaderBox title={"Welcome"} name={name} subtext={"Show the all backaccounts"} type={"greeting"} />

        <div className="space-y-4">
          <h2 className="header-2">
              Your cards
          </h2>
          <div className= "flex flex-wrap gap-6">
          {accounts.map((account, index) => (

            <BankCard 
              key={index}
              account={account}
              userName={name}
            />
            
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBankAccounts;
