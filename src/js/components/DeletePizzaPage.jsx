import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deletePizzaLocal } from "../store";

export default function DeletePizzaPage() {
  const dispatch = useDispatch();
  const [navigateAway, setNavigateAway] = useState(false);
  const [pizza, setPizza] = useState({
    id: 0,
    name: ''
  });
  const data = useSelector((state) => state.pizzaData);

  useEffect(() => {
    let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);
    setPizza(item);
  }, [data]);

  return (
    <div>
      {navigateAway ? <Navigate to="/" replace={true} /> :
      <div>
        <h1>Törlés</h1>
        <p>
          Biztosan törölni szeretné az "<b>{pizza.name}</b>"-t?
        </p>
        <button className="btn btn-danger" onClick={async () => {
          try {
            await axios.delete(`https://pizza.kando-dev.eu/Pizza/${pizza.id}`);
            dispatch(deletePizzaLocal(pizza.id));
            setNavigateAway(true);
          } catch (error) {
            alert(error);
          }
        }} style={{ marginRight: '10px' }}>Törlés</button>
        <button className="btn btn-secondary" onClick={() => window.history.back()}>Mégse</button>
      </div>
      }
    </div>
  );
}
