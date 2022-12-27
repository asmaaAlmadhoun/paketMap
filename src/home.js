import * as React from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import CountryMap from "./countryMap";
import { data } from "./data";
import './App.css';

export default function Home() {
    const [selectedCountry, setSelectedCountry] = React.useState();
    const [selectedCity, setSelectedCity] = React.useState();
    const [selectedNeighborhood, setSelectedNeighborhood] = React.useState();
    const availableCities = data.countries.find((c) => c.name === selectedCountry);
    const [popup, setPopup] = React.useState(`نص تجريبي`);
    const [position, setPosition] = React.useState([38.9072, -77.0369]);
    const [positionParent, setPositionParent] = React.useState([38.9072, -77.0369]);

    const ref = React.createRef();

    const availableNeighborhood = availableCities?.cities?.find(
        (s) => s.name === selectedCity
    );

    function setSelectedElement(newSelectedElement) {
        setSelectedNeighborhood(newSelectedElement.target.value);
        const Neighborhood = availableNeighborhood?.neighborhood.find(
            (s) => s.name === newSelectedElement.target.value
        );
        setPopup(Neighborhood.info);
        setPosition(Neighborhood.position);
        ref.current.handleFlyTo(positionParent, Neighborhood.position)
    }
    function setSelectedCityElement(newSelectedElement) {
        setSelectedCity(newSelectedElement.target.value);
        const city = availableCities?.cities.find(
            (s) => s.name === newSelectedElement.target.value
        );
        setPositionParent(city.position);
        ref.current.handleFlyTo(city.position, null)
    }
    return (
        <div>
            <Container className="justify-content-center mt-5" >
                <Row>
                    <Col>
                        <h3 className="text-center my-4 text-primary"> Paketman </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            <option>--الدولة--</option>
                            {data.countries.map((value, key) => {
                                return (
                                    <option value={value.name} key={key}>
                                        {value.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            placeholder="State"
                            value={selectedCity}
                            onChange={(e) => setSelectedCityElement(e)}
                        >
                            <option>--المدينة--</option>
                            {availableCities?.cities.map((e, key) => {
                                return (
                                    <option value={e.name} key={key}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            placeholder="City"
                            value={selectedNeighborhood}
                            onChange={(e) => setSelectedElement(e)}
                        >
                            <option>--الحي--</option>
                            {availableNeighborhood?.neighborhood.map(({ name }, index) => {
                                return (
                                    <option value={name} key={index}>
                                        {name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => ref.current.handleFlyTo(positionParent, position)}>
                            انتقل على الخريطة
                        </button>
                    </Col>
                </Row>
            </Container>
            <CountryMap refs={ref} popup={popup} position={positionParent} />
        </div>
    );
}
