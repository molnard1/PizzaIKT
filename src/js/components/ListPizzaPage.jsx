import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListPizzaPage() {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
            setData(res.data);
            setLoaded(true);
        })();
    }, []);

    const items = data.map((item) => (
        <Col key={item.id} style={{ marginBottom: '20px' }}>
            <Card style={{ border: '1px solid #ccc' }}>
                <Card.Img variant="top" src={item.kepURL} onError={(e) => {
                    e.target.src = "https://placeholders.dev?width=200&height=200";
                }} style={{ objectFit: 'cover', width: 400, height: 400 }} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Gluténmentes? {item.isGlutenFree ? 'igen' : 'nem'}</Card.Text>
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