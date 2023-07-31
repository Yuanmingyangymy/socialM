import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

export const AuthContext = createContext<any>(null)


export const AuthModeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")!) || null)


    const login = async (inputs: any) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
                withCredentials: true,
            });
            
            if (res.status === 404) {
                message.error('未找到该用户，请注册！');
            } else if (res.status === 400) {
                message.error('用户名或密码错误');
            } else if (res.status === 200) {
                message.success('登录成功');
                setCurrentUser(res.data);

                return '200'
            }
        
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                message.error('未找到该用户，请注册！');
            } else if (err.response && err.response.status === 400) {
                message.error('用户名或密码错误');
            } else {
                throw err;
            }
        }
    };



    // 在localStorage中存储的是字符串，因此如果要将JavaScript对象存储在localStorage中，需要使用JSON.stringify()将其转换为JSON字符串。当需要从localStorage中读取数据时，可以使用JSON.parse()将JSON字符串转换为JavaScript对象。
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])



    return (
        // 此处value的值为一个对象，所以用两层花括号包裹
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}