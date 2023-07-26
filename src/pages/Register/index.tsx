import React, { useState, ChangeEvent, MouseEvent  } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './index.scss';

const Register: React.FC = () => {
    interface userData {
        username: string;
        password: string;
        email: string;
    }
    // 表单信息
    const [inputs, setInputs] = useState<userData>({
        username: "",
        password: "",
        email: ""
    })
    // 错误信息
    const [err, setErr] = useState(null)

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))

    }

    async function handleReg(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs)
            
        } catch (err: any) {
            console.log(err);
            
            setErr(err.response.data)
        }
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
                        <input type="text" placeholder="请输入用户名" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="请输入密码" name="password" onChange={handleChange}/>
                        <input type="email" placeholder="请输入邮箱" name="email" onChange={handleChange}/>
                        {/* 错误信息提示 */}
                        {/* <span style={{color: "red"}}>{err && err}</span> */}
                        {err && err}
                        <button onClick={handleReg}>Register</button>
                    </form>
                </div>
            </div>
            </div>
    )
}

export default Register
