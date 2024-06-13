import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";
import BankCard from "./BankCard";

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance, user }) => {
  const cards = accounts.map((account) => {
    const amount = account.amount !== undefined ? parseFloat(account.amount) : 0;
    return {
      bankName: account.bankName || "Unknown Bank",
      cardHolder: account.cardHolder || user,
      cardNumber: account.cardNumber || "**** **** **** ****",
      spending: `$${amount.toFixed(2)}`,
    };
  });

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>

      <div className="ml-20">
        {cards.map((card, index) => (
          <BankCard key={index} account={card} userName={user} />
        ))}
      </div>
    </section>
  );
};

export default TotalBalanceBox;
