import React from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ListPizzaPage() {
    const data = useSelector((state) => state.pizzaData);
    const items = data.map((item) => (
        <Col key={item.id} sm={4} style={{ marginTop: '10px', marginBottom: '20px' }}>
            <Card>
                <Card.Img variant="top" alt={item.name} title={item.name} src={item.kepURL ?? "https://images.placeholders.dev?width=400&height=400"} onError={(e) => {
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
            <Container>
                <Row>{[...items]}</Row>
            </Container>
    );
}