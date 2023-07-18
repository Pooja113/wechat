import React, { useContext, useEffect } from "react";
import { ChatContext } from "../../Context/ChatProvider";
import MyChat from "../Components/Chats/MyChat";
import ChatBox from "../Components/Chats/ChatBox";
import SideDrawer from "../Components/Chats/SideDrawer";
import { Box } from "@chakra-ui/react";

const Chats = () => {
  const { user } = useContext(ChatContext);
   
   
  return <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    
    <Box display="flex" justifyContent="space-between" w="100%" h="91..5vh" p="10px">
      {user && <MyChat />}
      {user && <ChatBox />}

    </Box>
  </div>;
};

export default Chats;
