import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { editPizzaLocal } from "../store";

export default function UpdatePizzaPage() {
    const dispatch = useDispatch();
    const [pizzaData, setPizza] = useState({
        id: 0,
        name: ''
    });
    const [navigateAway, setNavigateAway] = useState(false);
    const data = useSelector((state) => state.pizzaData);

    useEffect(() => {
        let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);
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
            dispatch(editPizzaLocal(pizzaData));
            setNavigateAway(true);
        } catch (error) {
            console.log(error);
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
            {navigateAway ? <Navigate to="/" replace={true} /> :
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