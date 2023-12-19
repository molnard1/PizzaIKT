import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function CreatePizzaPage() {
  const [pizzaData, setPizzaData] = useState({
    name: "",
    kepURL: "",
    isGlutenFree: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://pizza.kando-dev.eu/Pizza", pizzaData, {
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

    setPizzaData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
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
        Hozzáadás
      </Button>
    </Form>
  );
}