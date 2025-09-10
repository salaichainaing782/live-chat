import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext'; // To get user and token
import { API_BASE_URL } from '../api/client'; // Re-use the base URL

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (user && !socket) {
      // Extract base URL without /api
      const socketUrl = API_BASE_URL.replace('/api', '');
      const newSocket = io(socketUrl, {
        query: { token: user.token }, // Pass token for authentication
        transports: ['websocket'], // Force websocket
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });

      setSocket(newSocket);
    } else if (!user && socket) {
      // Disconnect socket if user logs out
      socket.disconnect();
      setSocket(null);
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, authLoading, socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
