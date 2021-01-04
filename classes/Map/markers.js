class Markers {
    constructor() {
        this.actives = [];
    }

    addMarker = ( marker ) => {
        this.actives.push( marker );
    }

    updateMarker = ( id, lat, lng ) => {
        const marker = this.actives.find( marker => marker.id === id );

        marker.lat = lat;
        marker.lng = lng;
    }
};

module.exports = {
    Markers
};
