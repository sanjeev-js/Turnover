import React from 'react'
import Navbar from './components/Navbar';
import { setAxiosDefault, setToken } from "../axiosDefaults";
import { useAuth } from './context/auth-context';
import { LoggedInRouter, LoggedOutRouter } from './utils/routes';

const App = () => {
  const { user } = useAuth();
  if (user?.token) setToken(user.token);

  setAxiosDefault();

  return (
    <>
      <Navbar />
      {user ? <LoggedInRouter /> : <LoggedOutRouter />}
    </>
  )
}

export default App