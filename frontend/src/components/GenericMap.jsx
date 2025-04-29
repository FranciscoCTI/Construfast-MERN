import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useEffect, useState } from 'react';
import { RegularMapStyle } from '../MapStyles.js'
import dotIcon from '../../../uploads/dot.svg'
import { Box } from "@chakra-ui/react";
import MarkerInfo from "./MarkerInfo.jsx";
import ReactDOMServer from 'react-dom/server';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -36.795,
    lng: -73.066,
};

const MapWithStyle = ({ providers, onVisibleProvidersChange }) => {
    const mapRef = useRef(null);

    const infoWinRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const markersRef = useRef([]);

    function clearMarkers() {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
    }

    useEffect(() => {
        if (mapRef.current && providers.length > 0) {
            clearMarkers();
            providers.forEach(provider => {
                const newMark = new window.google.maps.Marker({
                    position: { lat: provider.lat, lng: provider.lng },
                    map: mapRef.current,
                    title: provider.name,
                    icon: {
                        url: dotIcon,
                        scaledSize: new window.google.maps.Size(10, 10)
                    }
                });

                newMark.setMap(mapRef.current);

                markersRef.current.push(newMark);

                const infoContent = ReactDOMServer.renderToString(<MarkerInfo provider={provider} />);

                const infoWindow = new window.google.maps.InfoWindow({
                    content: infoContent
                });

                newMark.addListener('click', () => {

                    if (infoWinRef.current) {
                        infoWinRef.current.close();
                    }

                    infoWindow.open(mapRef.current, newMark);
                    infoWinRef.current = infoWindow;
                });

            });
        }
    }, [providers]);

    return isLoaded ? (
        <div
            style={containerStyle}
            ref=
            {(el) => {
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

                    mapRef.current.addListener('idle', () => {
                        const bounds = mapRef.current.getBounds();
                        if (bounds) {
                            const visibleProviders = providers.filter((provider) => {
                                const position = new window.google.maps.LatLng(provider.lat, provider.lng);
                                return bounds.contains(position);
                            });
                            onVisibleProvidersChange(visibleProviders);
                        }
                    });

                    /*
                    //This recognize the location of the user and start the map there. Turn off for production
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
    
                            mapRef.current.setCenter(userLocation);
                            mapRef.current.setZoom(14);
                        },
                        (error) => {
                            console.error('There´s a problem getting the location', error);
                        }
    
                    );
                    */
                }
            }}
        />
    ) : (
        <p>Loading map...</p>
    );
};

export default MapWithStyle;