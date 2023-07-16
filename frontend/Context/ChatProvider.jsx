import { createContext, useContext, useEffect, useState } from "react";

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState() 
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)
  },[])
  return <ChatContext.Provider value={{ user, setUser }}>
    {children}
  </ChatContext.Provider>
}

// export const ChatState = () => {
//   return useContext(ChatContext)
// }

