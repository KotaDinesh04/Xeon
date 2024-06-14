const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


const route = express.Router();

const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidclient = new PlaidApi(configuration);

route.post("/create_link_token", async function (req, res) {
  // Get the client_user_id by searching for the current user
  /* const clientUser = null;
  const { email} = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      clientUser = user.email;
    }
  }); */

  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: "user",
    },
    client_name: "Plaid Test App",
    products: ["transactions"],
    language: "en",
    redirect_uri: "https://xeon-bank-nine.vercel.app/",
    country_codes: ["US","CA","FR"],
  };
  try {
    const createTokenResponse = await plaidclient.linkTokenCreate(request);
    res.json(createTokenResponse.data);
  } catch (error) {
    res.status(500).send("failure");
    // handle error
  }
});

route.post("/exchange_public_token", async function (req, res, next) {
  const publicToken = req.body.public_token;
  try {
    const response = await plaidclient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    // handle error
    res.status(500).send("Failed to access token: " + error.message);
  }
});


route.post("/auth" , async function(req,res){
    try{
      const accessToken = req.body.accessToken;
      const request= {
        access_token: accessToken,
      };
        const plaidresponse = await plaidclient.authGet(request);
        res.json(plaidresponse.data);

      }catch(e){
        res.status(500).send("Failure")
      }
});

route.post("/transaction/sync", async (req,res)=>{
  try{
    const request = {
      accessToken: accessToken
    };
    const response = await client.transactionsSync(request);
    const data = response.data;
    res.json(data);
  }catch(e){
    res.status(500).send("Failure")
  }
})


module.exports = {route , plaidclient};

