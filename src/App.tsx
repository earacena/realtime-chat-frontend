import React, { Dispatch, createContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginForm, RegisterForm } from './features/Login';
import { Chat } from './features/Chat';
import { Notification } from './features/Notification';
import { SideBar } from './features/SideBar';

type ThemeContextProps = {
  theme: string;
  setTheme: Dispatch<string>;
}

export const ThemeContext = createContext<ThemeContextProps>({ theme: '', setTheme: () => null });

function App() {

  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    document.title = "Real-time Chat"
  }, []);

  const chatWithSideBar = () => {
    return (
      <div className="flex flex-row animate-fade-in">
        <SideBar />
        <Chat />
      </div>
    );
  }

  return (
    <html className={theme === 'dark' ? 'dark' : '' }>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="flex flex-col h-screen animate-fade-in">
          <Notification />
          <Routes>
            <Route path="/" element={chatWithSideBar()} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/chat" element={chatWithSideBar()} />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </html>
  );
}

export default App;
