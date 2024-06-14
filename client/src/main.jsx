import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Connect from "./components/Connect.jsx";
import Mybanks from "./components/Mybanks.jsx";
import Payment from "./components/Payment.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authorize from "./components/Authorize/Authorize.jsx";
import Transaction from "./components/Transaction.jsx";
import Sign_UP from "./components/Authorize/Sign_UP.jsx";
const routerVariable = createBrowserRouter([
  {
    path: "/",
    element: <Authorize />,
  },
  {
    path: "/signup",
    element: <Sign_UP />,
  },
  {
    path: "/Home",
    element: <App />,
  },
  {
    path: "/mybank",
    element: <Mybanks />,
  },
  {
    path: "/transaction",
    element: <Transaction />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
]);

const socket = new WebSocket("ws://127.0.0.1:5500/ws");

socket.onopen = () => {
  console.log("Connected to the WebSocket server");
  socket.send("Hello Server!");
};

socket.onmessage = (event) => {
  console.log(`Message from server: ${event.data}`);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerVariable} />
  </React.StrictMode>
);

