import { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext<any>(null)

interface contextEle {
    children: React.ReactNode
}
export const DarkModeContextProvider = ({children}: contextEle) => {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")!) || false)

    const toggle = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode.toString())
    }, [darkMode])
    


    return (
        // 此处value的值为一个对象，所以用两层花括号包裹
        <DarkModeContext.Provider value ={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
}