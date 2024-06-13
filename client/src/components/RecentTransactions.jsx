/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import axios from "axios";


const RecentTransactions = ({ transactions }) => {
  const recentTransactions = [];
  let index = 0;
  
  while (index < transactions.length && recentTransactions.length < 10) {
    recentTransactions.push(transactions[index]);
    index++;
  }

  return (
    <div>
      <h2 className="recent-transactions-heading recent-transactions-label">
        Recent Transactions
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3 recent-transactions-table">
          <thead>
            <tr>
              <th scope="col" className="text-nowrap">Transaction</th>
              <th scope="col" className="text-nowrap">Amount</th>
              <th scope="col" className="text-nowrap">Date</th>
              <th scope="col" className="text-nowrap">Category</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td className="text-nowrap">{transaction.name}</td>
                <td className={`text-nowrap ${transaction.amount >= 0 ? "text-success" : "text-danger"}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="text-nowrap">{transaction.authorized_date}</td>
                <td className="text-nowrap">
                  {Array.isArray(transaction.category) ? (
                    transaction.category.map((category, index) => (
                      <span
                        key={index}
                        className={`badge ${getCategoryBadgeClass(category)} border border-primary text-primary me-1 px-2 py-1`}
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span
                      className={`badge ${getCategoryBadgeClass(transaction.category)} border border-primary text-primary me-1 px-2 py-1`}
                    >
                      {transaction.category}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to determine the CSS class for category badges and border color
const getCategoryBadgeClass = (category) => {
  switch (category.toLowerCase()) {
    case "travel":
      return "border-success text-success";
    case "taxi":
      return "border-danger text-danger";
    default:
      return "border-primary text-primary";
  }
};

export default RecentTransactions;