import React from 'react';
import { LoginForm, RegisterForm } from './features/Login';
import { Chat } from './features/Chat';
import { Route, Routes } from 'react-router-dom';
import { Notification } from './features/Notification';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Notification />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
