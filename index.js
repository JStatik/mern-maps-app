const dotenv = require( 'dotenv' ).config();
const Server = require( './classes/server' );

if( dotenv.error ) {
    throw new Error( colors.magenta( dotenv.error ) );
}

const server = new Server();
server.execute();
