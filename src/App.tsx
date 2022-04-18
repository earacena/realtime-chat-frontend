import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [socketId, setSocketId] = useState('');
  
  useEffect(() => {
    const socket = io('http://localhost:3001');
    
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
  }, []);


  return (
      <div className="App">
        {`Connected: ${socketId}`}
      </div>
    );
}

export default App;
