import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPizzaData } from "../store";

export default function CreatePizzaPage() {
  const dispatch = useDispatch();
  const [navigateAway, setNavigateAway] = useState(false);
  const [modifiedPizzaData, setModifiedPizzaData] = useState({
    name: "",
    kepURL: "",
    isGlutenFree: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://pizza.kando-dev.eu/Pizza", modifiedPizzaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Refetch everything again, since the POST response does not have ID
      let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
      dispatch(setPizzaData(res.data));

      setNavigateAway(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    setModifiedPizzaData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div>
    {navigateAway ?  <Navigate to="/" replace={true} /> :
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formPizzaName">
        <Form.Label>Pizza neve</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          placeholder="Hatvansajtos Pizza"
          value={modifiedPizzaData.name}
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
          value={modifiedPizzaData.kepURL}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGlutenFree">
        <Form.Check
          type="checkbox"
          name="isGlutenFree"
          label="Gluténmentes"
          checked={modifiedPizzaData.isGlutenFree}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Hozzáadás
      </Button>
    </Form>
  }
    </div>
  )
}