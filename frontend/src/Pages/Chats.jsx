import React, { useContext, useEffect, useState } from "react";
import MyChat from "../Components/Chats/MyChat";
import ChatBox from "../Components/Chats/ChatBox";
import SideDrawer from "../Components/Chats/SideDrawer";
import { Box } from "@chakra-ui/react";
import { ChatContext } from "../Context/ChatProvider";

const Chats = () => {
  const { user } = useContext(ChatContext);
  const [fetchAgain,setFetchAgain] = useState()
   
   
  return <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {user && <MyChat fetchAgain={fetchAgain} />}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </Box>
  </div>;
};

export default Chats;
