import React from 'react';
import { Chat } from './features/Chat';
import { SideBar } from './features/SideBar';

function App() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Chat />
    </div>
  );
}

export default App;
