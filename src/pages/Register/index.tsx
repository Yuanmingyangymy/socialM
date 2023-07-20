import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './index.scss';

const Register: React.FC = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Social.</h1>
                    <p>
                        Welcome to join us!
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="text" placeholder="Name" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
            </div>
    )
}

export default Register
