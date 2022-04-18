import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

function App() {
  const socket = useRef<Socket>();
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    socket.current = io('ws://localhost:3001');
    socket.current.on("connect", () => {
      if (socket.current) {
        setSocketId(socket.current.id);
      }
    });
    return () => { socket.current?.disconnect(); };
  }, []);


  return (
      <div className="App">
        {`Connected: ${socketId}`}
      </div>
    );
}

export default App;
