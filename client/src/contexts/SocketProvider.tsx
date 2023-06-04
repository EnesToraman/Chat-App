import { ReactNode, createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket>({} as Socket)

export const SocketProvider = ({ id, children }: { id: string, children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>({} as Socket)

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5001',
      { query: { id } }
    )
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}