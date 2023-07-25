import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<any>(null)

interface contextEle {
    children: React.ReactNode
}
export const AuthModeContextProvider = ({children}: contextEle) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")!) || false)

    const login = () => {
        // 登录处理函数
        setCurrentUser({id:1, username: "Ymy", profilePic:"https://avatars.githubusercontent.com/u/106372033?s=400&u=6687fcedc05ecf0d4277e977d87e05de446dd89a&v=4"})
    }


    // 在localStorage中存储的是字符串，因此如果要将JavaScript对象存储在localStorage中，需要使用JSON.stringify()将其转换为JSON字符串。当需要从localStorage中读取数据时，可以使用JSON.parse()将JSON字符串转换为JavaScript对象。
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])
    


    return (
        // 此处value的值为一个对象，所以用两层花括号包裹
        <AuthContext.Provider value ={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )
}