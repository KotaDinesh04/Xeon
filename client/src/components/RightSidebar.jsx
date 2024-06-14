import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const RightSidebar = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const averageAmount = totalTransactions ? (totalAmount / totalTransactions).toFixed(2) : 0;
  const recentTransaction = transactions.length > 0 ? transactions[0] : null;

  return (
    <aside className="right-sidebar bg-light p-4 rounded shadow-sm">
      <section className="flex flex-col pb-8">
        <div className="profile-banner mb-4">
          {/* Placeholder for profile banner */}
        </div>
      </section>
      <section className="summary-section">
        <h2 className="h4 mb-4">Summary</h2>
        <div className="summary-item mb-3 d-flex justify-content-between">
          <span>Total Transactions:</span>
          <span>{totalTransactions}</span>
        </div>
        <div className="summary-item mb-3 d-flex justify-content-between">
          <span>Total Amount Spent:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-item mb-3 d-flex justify-content-between">
          <span>Average Transaction:</span>
          <span>${averageAmount}</span>
        </div>
        {recentTransaction && (
          <div className="summary-item mt-4 p-3 bg-white rounded shadow-sm">
            <h5 className="h6">Recent Transaction:</h5>
            <p>Date: {recentTransaction.date}</p>
            <p>Description: {recentTransaction.description}</p>
            <p>Amount: ${recentTransaction.amount.toFixed(2)}</p>
          </div>
        )}
      </section>
    </aside>
  );
};

RightSidebar.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
};

export default RightSidebar;