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
        // <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
        //     <div className="container" style={{ margin: '0px', maxWidth: '100%' }}>
        //         <a href="/" className="navbar-brand d-flex me-auto"><h3>Ecommerce</h3></a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbar3">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <ul className="navbar-nav justify-content-center">
        //             <li className="nav-item active">
        //                 <a className="nav-link" href="#"><h6>Categories</h6></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#"><h6>Sale</h6></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#"><h6>Clearance</h6></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#"><h6>New Stock</h6></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#"><h6>Trending</h6></a>
        //             </li>
        //         </ul>
        //         <ul className="nav navbar-nav ms-auto justify-content-end">
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Help</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Order & Returns</a>
        //             </li>
        //             {user && <li className="nav-item dropdown">
        //                 <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {user?.data?.name} </a>
        //                 <ul onClick={() => {
        //                     localStorage.clear();
        //                     setToken(null);
        //                     setUser(null);
        //                     navigate("/login");
        //                 }} class="dropdown-menu dropdown-menu-lg-end">
        //                     <button className="btn" type="button">Logout</button>
        //                 </ul>
        //             </li>}
        //         </ul>
        //     </div>
        // </nav>

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