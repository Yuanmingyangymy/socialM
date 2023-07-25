import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";

import axios from 'axios';

import "./index.scss";
import { AuthContext } from '../../context/authContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)

  const handleLogin = () => {
    login()
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello.</h1>
          <p>
            welcome to join us!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
