const colors = require( 'colors' );
const { Markers } = require( './Map/markers' );

const markers = new Markers();

class Sockets {
    constructor( io ) {
        this.io = io;
        this.eventsSockets();
    }

    eventsSockets = () => {
        this.io.on( 'connection', async( client ) => {
            console.log( colors.yellow( 'Dispositivo conectado' ) );
        
            client.on( 'disconnect', () => {
                console.log( colors.red( 'Dispositivo desconectado' ) );
            } );

            client.emit( 'markers', { markers: markers.actives } );

            client.on( 'newMarker', ( { marker } ) => {
                markers.addMarker( marker );
                client.broadcast.emit( 'newMarker', { marker: marker } );
            } );

            client.on( 'updateMarker', ( { marker } ) => {
                const { id, lat, lng } = marker;

                markers.updateMarker( id, lat, lng );
                client.broadcast.emit( 'updateMarker', { marker: marker } );
            } );
        } );
    }
}

module.exports = Sockets;
