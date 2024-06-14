import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";
import BankCard from "./BankCard";

const TotalBalanceBox = ({ account, len, all, user, isActive }) => {
  /*  const cards = accounts.map((account) => {
    const amount = account.amount !== undefined ? parseFloat(account.amount) : 0;
    return {
      bankName: account.bankName || "Unknown Bank",
      cardHolder: account.cardHolder || user,
      cardNumber: account.cardNumber || "**** **** **** ****",
      spending: `$${amount.toFixed(2)}`,
    };
  });
 */
  return (
    <section className="total-balance">
        <div className="total-balance-chart ml-10 sm:hidden">
          <DoughnutChart account={all} />
        </div>

        <div className=" flex-col gap-6 ml-12 hidden sm:flex">
          <h2 className="header-2">Bank Accounts: {len}</h2>
          <div className="flex flex-col gap-2">
            <p className="total-balance-label hidden sm:block">Total Current Balance</p>
            <div className="total-balance-amount hidden sm:flex">
              {isActive && (
                <AnimatedCounter amount={account.balances?.current} />
              )}
            </div>
          </div>
        </div>
  
      <div className="ml-16 sm:mt-0 flex justify-center sm:block">
        <BankCard account={account} userName={user} />
      </div>
    </section>
  );
};

export default TotalBalanceBox;
