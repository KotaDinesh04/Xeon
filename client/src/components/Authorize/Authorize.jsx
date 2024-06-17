import React, { useState } from "react";
import Sign_IN from "./Sign_IN";
import image from "../../icons/auth.jpg";
import SignUp from "./Sign_UP";

const Authorize = () => {
  const [flag, setFlag] = useState(false);

  const handleToggle = () => {
    setFlag((prevFlag) => !prevFlag);
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8 relative">
        {flag ? (
          <div className="flex flex-col gap-1">
            <SignUp onSignupSuccess={handleToggle} />
            <p className="text-center text-gray-600 font-bold">
              Already have an account?{" "}
              <button
                onClick={handleToggle}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Sign_IN />
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={handleToggle}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>
      {/* Hide image on small devices */}
      <div className="hidden md:block  items-center justify-center bg-gray-100">
        <img src="/pic.png" className="w-full h-full object-cover" alt="Auth" />
      </div>
    </section>
  );
};

export default Authorize;
