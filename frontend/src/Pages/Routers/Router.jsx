import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/home";
import ChatPage from "../Chat/chatPage";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/chats/"} element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default Routers;
