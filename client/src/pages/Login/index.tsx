import { useContext, useState, ChangeEvent, MouseEvent } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";

import axios from 'axios';

import "./index.scss";
import { AuthContext } from '../../context/authContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)
  // 完成登录后跳转
  const navigate = useNavigate()
  interface userData {
    username: string;
    password: string;
  }
  // 表单信息
  const [inputs, setInputs] = useState<userData>({
    username: "",
    password: "",
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  }
  
  // 错误信息
  const [err, setErr] = useState(null)
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err: any) {
      setErr(err.response.data)
    }
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
            <input type="text" placeholder="Username" name='username' onChange={handleChange} />
            <input type="password" placeholder="Password" name='password' onChange={handleChange} />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
