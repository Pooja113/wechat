import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../Context/ChatProvider";

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useContext(ChatContext);
  if(!user) {
    navigate("/");

  }
  console.log(user);
  return <div>Chats</div>;
};

export default Chats;
