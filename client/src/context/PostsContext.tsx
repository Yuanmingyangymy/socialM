import { createContext, useState } from 'react';

export const PostSetContext = createContext<any>(null)

export const PostSetContextProvider = ({children}: {children: React.ReactNode}) => {
  const [postSet, setPostSet] = useState(false)

  return (
    // 此处value的值为一个对象，所以用两层花括号包裹
    <PostSetContext.Provider value ={{postSet, setPostSet}}>
        {children}
    </PostSetContext.Provider>
)
}