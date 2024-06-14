import { useEffect, useState } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import PlaidAccessToken from "./PlaidAccessToken";

axios.defaults.baseURL = "https://xeon-two.vercel.app";

const PlaidConnectBank = ({ sendtoDataParent }) => {
  const [linkToken, setLinkToken] = useState("");
  const [publicToken, setPublicToken] = useState(null);

  const handleChild = (accessToken) => {
    sendtoDataParent(accessToken);
  };

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
    <PlaidAccessToken public_token={publicToken} sendtoParent={handleChild} />
  ) : (
    <button
      style={{ marginRight: "25%", marginTop: "10px" }}
      className="flex justify-center btn btn-primary btn-md submit-btn"
      onClick={() => open()}
      disabled={!ready}
    >
      Connect a bank account
    </button>
  );
};

export default PlaidConnectBank;
