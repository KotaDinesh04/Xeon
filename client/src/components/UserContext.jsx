import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Separate state variables for each piece of user information
  const [name, setName] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser ? storedUser.name : undefined;
  });
  const [email, setEmail] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser ? storedUser.email : undefined;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser ? storedUser.accessToken : undefined;
  });

  // Function to update all user data
  const setUserContext = (newUser) => {
    setName(newUser.name);
    setEmail(newUser.email);
    setAccessToken(newUser.accessToken);
  };

  // Persist user data to localStorage whenever any piece of user data changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({ name, email, accessToken }));
  }, [name, email, accessToken]);

  return (
    <UserContext.Provider value={{ name, email, accessToken, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
