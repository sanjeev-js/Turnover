import React, { useState } from 'react'
import VerifyOtp from './VerifyOtp';
import { asyncWrap } from "../utils/utils";
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from "sweetalert2";


const Signup = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignup = async () => {
    if (email === "") {
      Swal.fire("Please enter your email.");
      return;
    } if (password === "") {
      Swal.fire("Please enter your password.");
      return;
    }

    const [error, result] = await asyncWrap(
      axios.post("/signup", {
        name: name,
        email: email,
        password: password,
      })
    );

    if (!result) {
      Swal.fire(error.response.data.message);
    }


    Swal.fire(result.data.message)
    setIsRegistered(true);
  };

  return (
    <>
      {isRegistered ? <VerifyOtp email={email} /> :
        // <div style={{ width: '800px' }} className="container my-5 shadow p-3 mb-5 bg-body-tertiary rounded">
        //   <form className='p-5'>
        //     <h4 className='text-center'>Create your account</h4>
        //     <div className="mb-3">
        //       <label htmlFor="name" className="form-label">Name</label>
        //       <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
        //     </div>
        //     <div className="mb-3">
        //       <label htmlFor="email" className="form-label">Email address</label>
        //       <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        //     </div>
        //     <div className="mb-3">
        //       <label htmlFor="password" className="form-label">Password</label>
        //       <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
        //     </div>
        //     <div className="d-grid gap-2">
        //       <button onClick={(e) => {
        //         e.preventDefault();
        //         handleSignup();
        //       }} type="submit" className="btn btn-secondary">CREATE ACCOUNT</button>
        //     </div>
        //   </form>
        //   <div className='text-center' >Have an account?   <b>  <Link to={'/login'}>Login</Link> </b></div>

        // </div>

        <div className="container my-5 shadow p-3 mb-5 bg-body-tertiary rounded" style={{ maxWidth: '800px' }}>
          <form className='p-5'>
            <h4 className='text-center'>Create your account</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" aria-describedby="emailHelp" />
            </div>
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
                e.preventDefault();
                handleSignup();
              }} type="submit" className="btn btn-secondary">CREATE ACCOUNT</button>
            </div>
          </form>
          <div className='text-center' >Have an account? <b><Link to={'/login'}>Login</Link></b></div>
        </div>
      }
    </>
  )
}

export default Signup