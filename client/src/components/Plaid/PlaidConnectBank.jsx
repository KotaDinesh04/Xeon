import { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import PlaidAccessToken from "./PlaidAccessToken";


/* axios.defaults.baseURL = "https://xeon-two.vercel.app"; 
*/

axios.defaults.baseURL = "http://localhost:3001";
const PlaidConnectBank = () => {
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState(null);


  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post("/token/create_link_token");
        setLinkToken(response.data.link_token);
        console.log("link-token ", response.data.link_token);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    };
    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      setPublicToken(public_token);
      console.log("Success public token", public_token, metadata);
    },
  });

  return publicToken ? (
    <PlaidAccessToken public_token={publicToken} />
  ) : (
    <button
      className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
      onClick={() => open()}
      disabled={!ready}
    >
      Connect a bank
    </button>
  );
};

export default PlaidConnectBank;
