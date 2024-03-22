import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import axios from 'axios';
import Swal from "sweetalert2";
import { asyncWrap } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const VerifyOtp = (props) => {

    const { email } = props;
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    const verifyOtp = async () => {
        if (email === "") {
          Swal.fire("Please enter your email.");
          return;
        } if (otp === "") {
          Swal.fire("Please enter your otp.");
          return;
        }
    
        const [error, result] = await asyncWrap(
          axios.post("/signup/verify-email-otp", {
            email,
            otp
          })
        );
    
        if (!result) {
          Swal.fire(error.response.data.message);
        }
    
    
        Swal.fire(result.data.message)
        navigate('/login')
      };

    return (
        <div style={{ maxWidth: '600px' }} className="card text-center container my-5 shadow p-3 mb-5 bg-body-tertiary rounded">

            <div className='card-body'>
                <h2 className="card-title">Verify your email</h2>
                <p className="card-text">Enter 8 digit code you have received on {email}.</p>

                <div className="d-flex justify-content-center">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={8}
                        renderSeparator={<span>-</span>}
                        inputType='number'
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                            width: "50px",
                            height: "50px",
                            padding: "6px",
                            color: "#434343",
                            fontSize: "25px",
                            margin: "7px",
                        }}
                        focusStyle={{
                            width: "50px",
                            height: "50px",
                            padding: "6px",
                            color: "#434343",
                            fontSize: "25px",
                            margin: "7px",
                        }}
                    />
                </div>
                <div className="mt-5 d-grid gap-2">
                    <button onClick={(e) => {
                        e.preventDefault()
                        verifyOtp()
                    }} type="submit" className="btn btn-secondary">VERIFY</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp