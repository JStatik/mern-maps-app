import React from 'react';
import { SocketProvider } from './context/SocketContext';
import Map from './pages/Map';

const MapsApp = () => {
    return (
        <SocketProvider>
            <Map />
        </SocketProvider>
    );
};

export default MapsApp;
