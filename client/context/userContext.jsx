import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        if (data !== null) {
          setIsLoggedIn(true); 
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
