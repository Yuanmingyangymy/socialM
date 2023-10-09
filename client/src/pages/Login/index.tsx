import { useContext, useState, ChangeEvent, MouseEvent } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import "./index.scss";
import { AuthContext } from '../../context/authContext';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext)

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
  // 完成登录后跳转
  const navigate = useNavigate()

  // 错误信息
  const [err, setErr] = useState(null)
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const res = await login(inputs)
      if (res === '200') {
        navigate("/")
      }

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
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
