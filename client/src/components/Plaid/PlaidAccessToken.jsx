import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

/* axios.defaults.baseURL = "http://localhost:3001"; */


const PlaidAccessToken = ({ public_token}) => {
  const {setUserContext} = useUser();
  useEffect(() => {
    async function fetch() {
      let accessToken = await axios.post("/token/exchange_public_token", {
        public_token: public_token,
      });
      console.log("access token : ", accessToken.data.accessToken);
      setUserContext({
        accessToken : accessToken.data.accessToken
      });
    }
    fetch();
  }, []);

  return;
};

export default PlaidAccessToken;
