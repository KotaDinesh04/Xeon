import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { useUser } from "./UserContext";

/* axios.defaults.baseURL = "https://xeon-two.vercel.app"; */
axios.defaults.baseURL = import.meta.env.VITE_server;

const TransactionHistory = () => {
  const {accessToken} = useUser();
  const [accounts, setAccounts] = useState([]);
  const [transactionAdded, setTransactionAdded] = useState([]);
  const [data, setData] = useState({});

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

  console.log("aldj", accessToken);

  return (
    <div className="container-fluid">
      <h2 className="recent-transactions-heading recent-transactions-label">
        Transactions
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3 w-100">
          <thead>
            <tr>
              <th scope="col" className="text-nowrap">
                Transaction
              </th>
              <th scope="col" className="text-nowrap">
                Amount
              </th>
              <th scope="col" className="text-nowrap">
                Date
              </th>
              <th scope="col" className="text-nowrap">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionAdded.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td className="text-nowrap">{transaction.name}</td>
                <td
                  className={`text-nowrap ${
                    transaction.amount >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="text-nowrap">{transaction.authorized_date}</td>
                <td className="text-nowrap">
                  {Array.isArray(transaction.category) ? (
                    transaction.category.map((category, index) => (
                      <span
                        key={index}
                        className={`badge ${getCategoryBadgeClass(
                          category
                        )} border border-primary text-primary me-1 px-2 py-1`}
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span
                      className={`badge ${getCategoryBadgeClass(
                        transaction.category
                      )} border border-primary text-primary me-1 px-2 py-1`}
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

export default TransactionHistory;
