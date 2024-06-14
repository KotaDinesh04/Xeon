// import "./Authorise.css";
import "./Sign_UP.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import image from "../../icons/auth.jpg";
import PlaidConnectBank from "../Plaid/PlaidConnectBank";
const Sign_UP = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSsn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  axios.defaults.baseURL = "https://xeon-two.vercel.app";

  const handleAccessToken = (access) => {
    setAccessToken(access);
  };

  //console.log(accessToken);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    const syncRequest = axios.post("/transactions/sync", {
      accessToken: accessToken,
    });

    const signupRequest = axios.post("/signup", { name, email, password, accessToken })
    
    Promise.all([syncRequest,signupRequest])
    .then((res)=>{
      const [syncRequest,signupRequest] = res ; 
      console.log(syncRequest.data);
      navigate("/");
    }).catch((err)=>{
      console.error("There was an error!!",err);
      setErrorMessage("An error Occured : "+err.message);
    })
  };

  return (
    <section className="body">
      <div className="main-container">
        <div className="form-container">
          <PlaidConnectBank sendtoDataParent={handleAccessToken} />
          {/*  forms */}
          <div className="divider"></div>
          <form className="main signIn-text" onSubmit={handleSubmit}>
            <b>
              <h1 style={{ fontSize: "30px" }}>Sign Up</h1>
            </b>

            <p className="font-bold mb-2">Please enter your details.</p>
            <div className="flex flex-wrap">
              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  First Name <span className="mandate">*</span>
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex: John"
                  aria-label=".form-control-md example"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  second Name <span className="mandate">*</span>
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex: John"
                  aria-label=".form-control-md example"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">Address</label>
                <input
                  className="w-96 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex: John"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">State</label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex: Telangana"
                  aria-label=".form-control-md example"
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  Postal Code
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex: 500083"
                  aria-label=".form-control-md example"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  Date of Birth
                </label>
                <input
                  className="w-65 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="date"
                  aria-label=".form-control-md example"
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  Mobile No <span className="mandate">*</span>
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="ex:+91"
                  aria-label=".form-control-md example"
                  required
                  onChange={(e) => setSsn(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  Email <span className="mandate">*</span>
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="email"
                  placeholder="ex: John@gmail.com"
                  aria-label=".form-control-md example"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mt-3 ml-2 mb-1">
                  Password <span className="mandate">*</span>
                </label>
                <input
                  className="w-55 border border-black-2 p-1.5 rounded-lg mr-12"
                  type="text"
                  placeholder="password"
                  aria-label=".form-control-md example"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="submit text-center">
              <button
                type="submit"
                className="btn btn-primary btn-md submit-btn"
              >
                Sign Up
              </button>
            </div>
            <p className="no-style" style={{ paddingRight: "100px" }}>
              Already have an account?{" "}
              <Link to="/" color="blue">
                Login
              </Link>
            </p>
            {errorMessage && (
              <p className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
          </form>
        </div>
        <div className="image-container">
          <img src={image} className="image" alt="Auth" />
        </div>
      </div>
    </section>
  );
};

export default Sign_UP;
