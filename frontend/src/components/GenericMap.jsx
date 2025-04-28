import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from 'react';
import { RegularMapStyle } from '../MapStyles.js'
import dotIcon from '../../../uploads/dot.svg'

const containerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: -36.795,
    lng: -73.066,
};

const markerHouse = {
    lat: -36.79084814,
    lng: -73.05656460,
};

const severalMarkers = [
    { lat: -36.79084814, lng: -73.05656460, message: 'Familia Contreras Ortega' },
    { lat: -36.82490, lng: -73.019085, message: 'Familia Contreras Chavez' },
    { lat: -36.794150, lng: -73.0537552, message: 'Familia Cartes Ortega' },
    { lat: -36.72243331, lng: -73.11611534, message: 'Familia Ortega Aravena' },
    { lat: -33.438267, lng: -70.6592950, message: 'Felipe Contreras Chavez' }
]

const MapWithStyle = () => {
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    return isLoaded ? (
        <div
            style={containerStyle}
            ref={(el) => {
                if (el && !mapRef.current) {
                    mapRef.current = new window.google.maps.Map(el, {
                        center,
                        zoom: 14,
                        styles: RegularMapStyle,
                        gestureHandling: 'greedy',
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false
                    });

                    severalMarkers.forEach(m => {
                        const marker = new window.google.maps.Marker({
                            position: { lat: m.lat, lng: m.lng },
                            map: mapRef.current,
                            title: m.message,
                            icon: {
                                url: dotIcon,
                                scaledSize: new window.google.maps.Size(20, 20)
                            }
                        });

                        const popup = new window.google.maps.InfoWindow();

                        window.google.maps.event.addListener(marker, 'click', (function (marker) {
                            return function () {
                                popup.setContent(m.message)
                                popup.open(mapRef.current, marker)
                            }
                        })(marker)
                        )
                        marker.setMap(mapRef.current);
                    })
                }
            }}
        />
    ) : (
        <p>Loading map...</p>
    );
};

export default MapWithStyle;