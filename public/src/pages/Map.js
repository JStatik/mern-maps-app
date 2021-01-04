import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import useMapBox from '../hooks/useMapBox';

const initialPoint = {
    lat: -64.48509,
    lng: -31.12105,
    zoom: 13
};

const Map = () => {
    const { socket } = useContext( SocketContext );

    const { mapDiv, coords, marker, markerTemp, addMarker, updateMarker } = useMapBox( initialPoint );
    const { lat: latMap, lng: lngMap, zoom: zoomMap } = coords;

    useEffect( () => {
        socket.on( 'markers', ( { markers } ) => {
            markers.map( marker => addMarker( marker ) );
        } );

        socket.on( 'newMarker', ( { marker } ) => {
            addMarker( marker );
        } );
    }, [ socket, addMarker ] );

    useEffect( () => {
        if( markerTemp ) {
            const { id } = markerTemp;
            const { lat, lng } = markerTemp.getLngLat();

            socket.emit( 'newMarker', { marker: { id, lat, lng } } );
        }
    }, [ socket, markerTemp ] );

    useEffect( () => {
        if( marker ) {
            socket.emit( 'updateMarker', { marker: marker } );
        }
    }, [ socket, marker ] );

    useEffect( () => {
        socket.on( 'updateMarker', ( { marker } ) => {
            updateMarker( marker );
        } );
    }, [ socket, updateMarker ] );

    return (
        <>
            <div className="info">{ `lat: ${ latMap } | lng: ${ lngMap } | zoom: ${ zoomMap }` }</div>

            <div className="mapContainer" ref={ mapDiv }></div>
        </>
    );
};

export default Map;
