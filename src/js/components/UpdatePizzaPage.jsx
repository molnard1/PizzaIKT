import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UpdatePizzaPage() {
    const [pizzaData, setPizza] = useState({
        id: 0,
        name: ''
    });
    const [error, setError] = useState(false);
    const data = useSelector((state) => state.pizzaData);

    useEffect(() => {
        let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);
        if (!item) setError(true);
        setPizza(item);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://pizza.kando-dev.eu/Pizza/${pizzaData.id}`, pizzaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.location.href = "/";
        } catch (error) {
            alert("Hiba");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

        const updatedPizzaData = {
            ...pizzaData,
            [name]: newValue,
        };

        setPizza(updatedPizzaData);
    };

    return (
        <div>
            {error ? <Navigate to="/" replace={true} /> :
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formPizzaName">
                        <Form.Label>Pizza neve</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="name"
                            placeholder="Hatvansajtos Pizza"
                            value={pizzaData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPizzaURL">
                        <Form.Label>Kép link</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="kepURL"
                            placeholder="https://example.com/pizza.png"
                            value={pizzaData.kepURL}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGlutenFree">
                        <Form.Check
                            type="checkbox"
                            name="isGlutenFree"
                            label="Gluténmentes"
                            checked={pizzaData.isGlutenFree}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Szerkesztés
                    </Button>
                </Form>
            }
        </div>
    );
}