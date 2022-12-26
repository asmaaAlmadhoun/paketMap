import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css';

export default function CountryMap(props) {
   
    const [map, setMap] = React.useState(null);
    React.useImperativeHandle(props.refs, () => ({
        handleFlyTo(newPosition) {
            handleFlyTo(newPosition)
        }
    })); 
    function handleFlyTo(newPosition) {
        console.log(newPosition)
        map.flyTo(newPosition, 13, {
            duration: 2
        });
    }
   
    return (
        <div className="m-4 p-4">
            <MapContainer ref={setMap} center={props.position} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.position}>
                    <Popup>
                        {props.popup}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>

    );
}
