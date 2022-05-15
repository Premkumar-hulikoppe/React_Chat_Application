import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("http://localhost:5000/api/chats");
    setChats([...data]);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>welcome to chat page</h1>
      {chats.map((e) => (
        <h2 key={e._id}>{e.chatName}</h2>
      ))}
    </div>
  );
};

export default ChatPage;
