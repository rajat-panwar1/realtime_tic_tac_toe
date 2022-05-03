import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { io } from 'socket.io-client';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  paddingg: 1em;
`;
function App() {
  const connect = () => {
    const socket = io('http://localhost:9000');

    socket.on('connect', () => {
      socket.emit('custom_event', { name: 'hyzen', age: '23' });
    });
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <AppContainer>
      <h1>Welcome to Tic-Tac-Toe</h1>
    </AppContainer>
  );
}

export default App;
