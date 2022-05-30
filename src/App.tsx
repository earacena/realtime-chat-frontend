import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm, RegisterForm } from './features/Login';
import { Chat } from './features/Chat';
import { Notification } from './features/Notification';
import { SideBar } from './features/SideBar';

function App() {

  const chatWithSideBar = () => {
    return (
      <div className="flex flex-row">
        <SideBar />
        <Chat />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Notification />
      <Routes>
        <Route path="/" element={chatWithSideBar()} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/chat" element={chatWithSideBar()} />
      </Routes>
    </div>
  );
}

export default App;
