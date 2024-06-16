import axios from "axios";
import { useState } from "react";
import PlaidConnectBank from "../Plaid/PlaidConnectBank";
import { useUser } from "../UserContext";

const SignUp = ({ onSignupSuccess }) => {
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
  axios.defaults.baseURL = "https://xeon-two.vercel.app";
 const {accessToken} = useUser();

/*   axios.defaults.baseURL = "http://localhost:3001"; */

  const handleSubmit = (e) => {
    e.preventDefault();

    const syncRequest = axios.post("/transactions/sync", {
      accessToken: accessToken,
    });

    const signupRequest = axios.post("/signup", { name, email, password, accessToken });
    
    Promise.all([syncRequest, signupRequest])
      .then((res) => {
        const [syncResponse, signupResponse] = res; 
        console.log(syncResponse.data);
        console.log(signupResponse.data);
        onSignupSuccess(); // Call the success callback
      })
      .catch((err) => {
        console.error("There was an error!!", err);
        setErrorMessage("An error occurred: " + err.message);
        });
        };
        
        return (
          <section className="flex items-center justify-center bg-white">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-gray-600">Please enter your details.</p>
      <PlaidConnectBank />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex: John"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex: Doe"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="ex: 123 Main St"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                placeholder="ex: California"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                placeholder="ex: 90210"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="ex: +1 234 567 890"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                onChange={(e) => setSsn(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="ex: john@gmail.com"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded hover:bg-purple-700"
            >
              Sign Up
            </button>
          </div>
          
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
            )}
        </form>
      </div>
    </section>
  );
};

export default SignUp;
