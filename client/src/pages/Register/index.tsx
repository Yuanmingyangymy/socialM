import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link, useNavigate } from "react-router-dom";
import './index.scss';
import { message } from 'antd';
import { makeRequest } from '../../axios';
const Register: React.FC = () => {
    interface userData {
        username: string
        password: string
        email: string
        authCode?: number | string
    }
    // 表单信息
    const [inputs, setInputs] = useState<userData>({
        username: "",
        password: "",
        email: ""
    })
    // 错误信息
    const [err, setErr] = useState(null)


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const handleValidation = () => {
        const { username, password, email } = inputs;

        // 正则表达式匹配 QQ 邮箱格式
        const qqEmailPattern = /^[a-zA-Z0-9_]+@qq\.com$/;

        if (username.trim().length < 1) {
            message.error("用户名不能为空");
            return false;
        } else if (password.trim().length < 6) {
            message.error("密码至少六位");
            return false;
        } else if (!qqEmailPattern.test(email.trim())) {
            message.error("请输入有效的 QQ 邮箱");
            return false;
        }

        return true;
    };

    const handleAuthCode = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (handleValidation()) {

            try {
                const res = await makeRequest.post("/auth/getAuthCode", inputs)
                console.log(res);

                if (res.status === 200) {
                    message.success(res.data)
                }
            } catch (err: any) {
                if (err.response && err.response.status === 409) {
                    message.error(err.response.data)
                } else {
                    throw err
                }
            }
        }


    }

    const navigate = useNavigate()

    async function handleReg(e?: MouseEvent<HTMLButtonElement>) {
        e?.preventDefault()
        const { authCode } = inputs
        if (authCode?.toString().trim().length === 0) {
            message.error('请输入验证码')
            return
        }

        try {
            const res = await makeRequest.post("/auth/register", inputs)
            if (res.status === 200) {
                message.success('注册成功！')
                navigate("/login")
            }
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                message.error(err.response.data)
            } else if (err.response && err.response.status === 400) {
                message.error(err.response.data)
            } else {
                throw err
            }
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
                        <input type="text" placeholder="请输入用户名" name="username" onChange={handleChange} />
                        <input type="password" placeholder="请输入密码" name="password" onChange={handleChange} />
                        <input type="email" placeholder="请输入QQ邮箱" name="email" onChange={handleChange} />
                        <input type="text" placeholder='请输入验证码' name='authCode' onChange={handleChange} />
                        <button onClick={handleAuthCode}>获取验证码</button>
                        <button onClick={handleReg}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
