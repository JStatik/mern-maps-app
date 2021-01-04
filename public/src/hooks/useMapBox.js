import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import uniqid from 'uniqid';

mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const useMapBox = ( initialPoint ) => {
    const map = useRef();
    const mapDiv = useRef();
    const [ coords, setCoords ] = useState( initialPoint );

    const markers = useRef( [] );
    const [ marker, setMarker ] = useState();
    const [ markerTemp, setMarkerTemp ] = useState();

    const getCoordsMarker = useCallback( ( marker ) => {
        marker.on( 'drag', ( { target } ) => {
            const { id } = target;
            const { lat, lng } = target.getLngLat();

            setMarker( { id, lat, lng } );
        } );
    }, [] );

    const addMarker = useCallback( ( marker ) => {
        const { lat, lng } = marker.lngLat || marker;
        const newMarker = new mapboxgl.Marker();

        newMarker.id = marker.id || uniqid();
        newMarker
            .setLngLat( [ lng, lat ] )
            .addTo( map.current )
            .setDraggable( true );

        !marker.id && setMarkerTemp( newMarker );
        markers.current.push( newMarker );
        getCoordsMarker( newMarker );
    }, [ getCoordsMarker ] );

    const updateMarker = useCallback( ( marker ) => {
        const { id, lat, lng } = marker;
        const markerStorage = markers.current.find( marker => marker.id === id );

        markerStorage.setLngLat( [ lng, lat ] );
    }, [] );

    useEffect( () => {
        map.current = new mapboxgl.Map( {
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ initialPoint.lat, initialPoint.lng ],
            zoom: initialPoint.zoom
        } );

        map.current.on( 'move', () => {
            const { lat, lng } = map.current.getCenter();

            setCoords(
                {
                    lat: lat.toFixed( 4 ),
                    lng: lng.toFixed( 4 ),
                    zoom: map.current.getZoom().toFixed( 0 )
                }
            );
        } );

        map.current.on( 'click', ( marker ) => {
            addMarker( marker );
        } );
    }, [ initialPoint, addMarker ] );

    return { coords, mapDiv, marker, markerTemp, addMarker, updateMarker };
};

export default useMapBox;
