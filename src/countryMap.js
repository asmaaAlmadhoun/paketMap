import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css';

export default function CountryMap(props) {
   
    const [map, setMap] = React.useState(null);
    const [position, setPosition] = React.useState(null);

    React.useImperativeHandle(props.refs, () => ({
        handleFlyTo(parentPosition, childPosition) {
            handleFlyTo(parentPosition, childPosition)
        }
    })); 
    function handleFlyTo(parentPosition, childPosition) {
        setPosition(childPosition);
        map.flyTo(parentPosition, 11, {
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
                {
                    position?position.map((oneposition, index) => {
                        return (<Marker key={index} position={oneposition.position}>
                        <Popup>
                            {oneposition.info}
                        </Popup>
                    </Marker>)
                    })
                    :
                    <Marker position={props.position}>
                        <Popup>
                            {props.popup}
                        </Popup>
                    </Marker>
                }                
            </MapContainer>
        </div>

    );
}
