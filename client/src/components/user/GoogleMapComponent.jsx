import React, { useState, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "80vh",
};

const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629,
};

// Google Maps API Key
const googleMapsApiKey = import.meta.env.VITE_MAP_API_KEY;

const GoogleMapComponent = ({ markerPosition, setMarkerPosition, setAddress }) => {
    const [center, setCenter] = useState(defaultCenter);
    const autocompleteRef = useRef(null);

    // Load Google Maps API
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries: ["places"],
    });

    // Handle map click
    const handleMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        console.log("New Marker Position:", newPosition);
        setMarkerPosition(newPosition);
        setAddress(`${newPosition.lat},${newPosition.lng}`);
    };

    // Handle place selection from Autocomplete
    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            console.log(place);
            if (place.geometry) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                console.log("Selected Place:", location);
                setCenter(location);
                setAddress(place.formatted_address);
                setMarkerPosition(location);
            }
        }
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <div className="p-4">
            <div className="mb-4  relative flex justify-center">
                {/* Search Input */}
                <div className="mb-4 absolute z-[1] top-14 w-[70%]">
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for a location..."
                            className="w-full p-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                    </Autocomplete>
                </div>

                {/* Google Map */}
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={center} onClick={handleMapClick}>
                    {/* Display marker if position is set */}
                    {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
            </div>

            {/* Display latitude and longitude */}
            {markerPosition && (
                <div className="mt-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Latitude:</span> {markerPosition.lat.toFixed(6)}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Longitude:</span> {markerPosition.lng.toFixed(6)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoogleMapComponent;
