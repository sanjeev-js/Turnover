import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/auth-context';
import { useNavigate } from "react-router-dom";
import { setToken } from "../../axiosDefaults";

const Navbar = () => {

    const { user, setUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container" style={{ margin: '0px', maxWidth: '100%' }}>
                <Link to="/" style={{ width: '36%' }} className="navbar-brand"><h3 >Ecommerce</h3></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} style={{ justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link"><h6>Home</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link"><h6>Categories</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sale" className="nav-link"><h6>Sale</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clearance" className="nav-link"><h6>Clearance</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new-stock" className="nav-link"><h6>New Stock</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/trending" className="nav-link"><h6>Trending</h6></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/help" className="nav-link"><h6>Help</h6></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order-and-returns" className="nav-link"><h6>Order & Returns</h6></Link>
                        </li>
                        {user && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user?.data?.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar