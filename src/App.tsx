import React, { useState } from 'react';
import { Chat } from './features/Chat';
import { SideBar } from './features/SideBar';
import { LoginForm } from './features/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="flex flex-row">
      <LoginForm />
      {loggedIn && <SideBar />}
      {loggedIn && <Chat />}
    </div>
  );
}

export default App;
