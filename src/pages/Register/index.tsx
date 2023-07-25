import React from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './index.scss';

const Register: React.FC = () => {
    interface userData {
        username: string;
        password: string;
        email?: string;
    }

    

    function handleReg() {
        axios.post("http://127.0.0.1:3007/api/register").then(res => {
            console.log(res);
            
        })
    }


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
                        <input type="password" placeholder="Password" />
                        {/* <input type="email" placeholder="Email" /> */}
                        <button onClick={handleReg}>Register</button>
                    </form>
                </div>
            </div>
            </div>
    )
}

export default Register
