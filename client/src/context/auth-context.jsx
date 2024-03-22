import React, { useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStoraage";

export const AuthContext = React.createContext({});
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const [userData, setUserData] = useLocalStorage("loginuser", null);
 
  const logout = useCallback(() => {
    setUserData(null);
  }, [setUserData]);

  return (
    <AuthContext.Provider
      value={{ logout, user: userData, setUser: setUserData }}
      {...props}
    />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
