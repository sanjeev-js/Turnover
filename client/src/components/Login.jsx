import React, { useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { asyncWrap } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../axiosDefaults";
import { useAuth } from '../context/auth-context';
import { Link } from "react-router-dom"

const Login = () => {

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "") {
      Swal.fire("Please enter your email.");
      return;
    } if (password === "") {
      Swal.fire("Please enter your password.");
      return;
    }

    const [error, result] = await asyncWrap(
      axios.post("/login", {
        email: email,
        password: password,
      })
    );

    if (!result) {
      Swal.fire(error.response.data.message);
    }

    else {
      // Swal.fire(result.data.message)
      if (setUser) setUser(result.data);
      setToken(result.data.token);
      navigate("/user-interest");
    }
  };


  return (
    <div style={{ maxWidth: '800px' }} className="container my-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <form className='p-5'>
        <h1 className='text-center'>Login</h1>
        <h4 className='text-center'>Welcome back to ECOMMERCE</h4>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
        </div>
        <div className="d-grid gap-2">
          <button onClick={(e) => {
            e.preventDefault()
            handleLogin()
          }} type="submit" className="btn btn-secondary">Login</button>
        </div>
      </form>
      <div className='text-center' >Don't have an account?   <b>  <Link to={'/signup'}>SIGN UP</Link> </b></div>
    </div>
  )
}

export default Login