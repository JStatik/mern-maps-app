import React, { createContext } from 'react'
import useSocket from '../hooks/useSocket';

const SocketContext = createContext();

const SocketProvider = ( { children } ) => {
    const { socket, online } = useSocket( 'http://localhost:4000' );

    return (
        <SocketContext.Provider value={ { socket, online } }>
            { children }
        </SocketContext.Provider>
    );
};

export {
    SocketContext, 
    SocketProvider 
};
