const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//user

const { createToken, verifyToken, authenticateToken } = require("./utils/jwt");
const app = express();

const { route, plaidclient } = require("./routes/tokens");
const transactionsRouter = require("./routes/transactions");

app.use(express.json());

// const port =3001;
const UserModel = require("./models/User");
const UserTransaction = require("./models/transaction");
const http = require("http");
app.use(express.json());
app.use(
  cors({
    //Link of the main origin from where it can be requested
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval' https://*.plaid.com https://www.gstatic.com/recaptcha/ https://www.google.com/recaptcha/ https://cdn.getpinwheel.com 'sha256-/vBLPmGAtk+M1jf+ELFldGuWmC95W++i9SAdPi6fuGM=' 'sha256-Q2BuusfJf7qPwvz9U1VOF502KW7JtNFXxsDsxfPIu50=' blob:;"
  );
  next();
});


//DataBase connection
mongoose
  .connect(
    "mongodb+srv://saikrishnachintha06:sai123krishna@cluster0.i1yyaz8.mongodb.net/xeon?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

// check base server

app.get("/",(req,res)=>{
  res.send("Hello Server!!");
})



//Registration
app.post("/signup", async (req, res) => {
  const { name, email, password, accessToken } = req.body;
  try {
    await UserModel.create({ name, email, password, accessToken });
    res.json("Success");
  } catch (err) {
    res.json(err);
  }
});

// plaid Configuration

app.use("/token", route);
app.use("/transactions", transactionsRouter);

//database user data
app.get("/db", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await UserModel.findById(id );
    if (user) {
      res.json({ accessToken: user.accessToken, name: user.name });
    }
  } catch (er) {
    res.send(er).status(500);
  }
});


app.get("/transdb", async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(400).json({ error: "Access token is missing" });
  }

  try {
    const list = await UserTransaction.findOne({ accessToken: accessToken });
    if (list) {
      return res.status(200).json(list);
    } else {
      return res.status(404).json({ error: "Transactions not found" });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        const token = createToken(user);
        res.json({ Status: "Success", token, details: user });
      } else {
        res.json("The password is incorrect");
      }
    } else {
      console.log("No record exists..");
      res.json("No record exists...");
    }
  } catch (err) {
    res.status(500).json("An error occurred: " + err);
  }
});

// Token verification endpoint
// Verify Token
app.get("/verifyToken", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      console.error("Authorization header missing");
      return res
        .status(403)
        .json({ valid: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error("Token missing in authorization header");
      return res
        .status(403)
        .json({ valid: false, message: "No token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      console.error("Failed to verify token");
      return res
        .status(403)
        .json({ valid: false, message: "Failed to authenticate token" });
    }

    res.json({ valid: true, token, user: decoded });
  } catch (error) {
    console.error("Error in /verifyToken endpoint:", error);
    res.status(500).json({ valid: false, message: "Internal server error" });
  }
});

//Testing protected route
app.get("/home", authenticateToken, (req, res) => {
  res.json("This is a protected route");
});
// server port setup

const PORT = 3001;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("Server is Running " + PORT);
});


// web sockeet 

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5500 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://127.0.0.1:5500/ws');
