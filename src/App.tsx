import React, { useState } from 'react';
import { Chat } from './features/Chat';
import { SideBar } from './features/SideBar';
import { LoginForm } from './features/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!loggedIn && <LoginForm />}
      {loggedIn && <SideBar />}
      {loggedIn && <Chat />}
    </div>
  );
}

export default App;
