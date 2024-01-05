import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setPizzaData } from "../store";
import { useSelector, useDispatch } from "react-redux";

export default function ListPizzaPage() {
    const data = useSelector((state) => state.pizzaData);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
            dispatch(setPizzaData(res.data));
            setLoaded(true);
        })();
    }, []);

    const items = data.map((item) => (
        <Col key={item.id} sm={4} style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Card>
                <Card.Img variant="top" src={item.kepURL ?? "https://images.placeholders.dev?width=400&height=400"} onError={(e) => {
                    e.target.src = "https://images.placeholders.dev?width=400&height=400";
                }} style={{ objectFit: 'cover', height: '25vw', width: '100%' }} />
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text style={{ color: item.isGlutenFree ? 'green' : 'red', fontWeight: 'bolder' }}>{item.isGlutenFree ? 'Gluténmentes' : 'Glutént tartalmaz!'}</Card.Text>
                    <Link to={`/${item.id}/edit`}>
                        <Button variant="primary" style={{ marginRight: '10px' }}>
                            Szerkesztés
                        </Button>
                    </Link>
                    <Link to={`/${item.id}/delete`}>
                        <Button variant="danger">Törlés</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    ));


    return (
        <>
            {loaded ? (
                <Container>
                    <Row>{[...items]}</Row>
                </Container>
            ) : (
                <div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
                    <Spinner animation="border" role="status" />
                    <h1>Töltés...</h1>
                </div>
            )}
        </>
    );
}