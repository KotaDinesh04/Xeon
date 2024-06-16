// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Connect from './components/Connect.jsx';

import Sign_UP from './components/Authorize/Sign_UP.jsx';
import Dashboard from './components/Dashboard.jsx';
import Authorize from './components/Authorize/Authorize.jsx'
import TransactionHistory from './components/TransactionHistory.jsx';
import PaymentFund from './components/PaymentFund.jsx';
import { UserProvider } from './components/UserContext.jsx';
import MyBankAccounts from './components/MyBankAccounts.jsx';

const routerVariable = createBrowserRouter([
  {
    path: '/',
    element: <Authorize />,
  },
  {
    path: '/connect',
    element: <Connect />,
  },
  {
    path: '/home',
    element: <App />, // Render App component here
    children: [
      {
        path: '/home',
        element: <Dashboard />,
      },
      {
        path: '/home/mybank',
        element: <MyBankAccounts />,
      },
      {
        path: '/home/transaction',
        element: <TransactionHistory />,
      },
      {
        path: '/home/payment',
        element: <PaymentFund />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={routerVariable} />
    </UserProvider>
  </React.StrictMode>
);
