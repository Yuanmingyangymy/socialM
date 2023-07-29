import React, { useState, ChangeEvent, MouseEvent, useEffect  } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import './index.scss';
import { Button, message, Space } from 'antd';

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

    // 网络请求反馈
    const [messageApi, contextHolder] = message.useMessage()

    const success = (content:string) => {
        messageApi.open({
          type: 'success',
          content: '注册成功',
        });
      };
    
      const error = (content:string) => {
        messageApi.open({
          type: 'error',
          content: '注册失败',
        });
      };

    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))

    }

    async function handleReg(e?: MouseEvent<HTMLButtonElement>) {
        e?.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", inputs).then(res => {
                console.log(res.data);
                
                if(res.status === 409) {
                    message.error('用户名已存在！请更换用户名')
                } else if(res.status === 200) {
                    message.success('注册成功！')
                }
            })
            
        } catch (err: any) {
            throw(err)
            
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
