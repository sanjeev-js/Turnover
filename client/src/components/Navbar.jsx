import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth-context';
import { useNavigate } from "react-router-dom";
import { setToken } from "../../axiosDefaults";

const Navbar = () => {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">ECOMMERCE</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {!user ?
                            <>
                                <li className="nav-item">
                                    <Link to={'/login'} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/signup'} className="nav-link">Sign up</Link>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <Link to={'/user-interest'} className="nav-link"> User Interest</Link>
                            </li>
                        }
                    </ul>
                </div>

                <button onClick={() => {
                    localStorage.clear();
                    setToken(null);
                    setUser(null);
                    navigate("/login");
                }} class="btn" type="button">Logout</button>

            </div>
        </nav>
    )
}

export default Navbar