import { createContext, useState, useContext } from 'react';

export const StateContext = createContext<any>(null)


export const StateContextProvider = ({children}: {children: React.ReactNode}) => {

    const [refresh, setRefresh] = useState<boolean>(false)

    
    

    return (
        // 此处value的值为一个对象，所以用两层花括号包裹
        <StateContext.Provider value ={{refresh, setRefresh}}>
            {children}
        </StateContext.Provider>
    )
}
