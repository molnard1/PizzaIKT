import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DeletePizzaPage() {
    const [pizza, setPizza] = useState({
      id: 0,
      name: ''
    });
    const [error, setError] = useState(false);
    const data = useSelector((state) => state.pizzaData);

    useEffect(() => {
      let item = data.find((item) => item.id == window.location.pathname.split("/")[1]);
      if(!item) setError(true);
      setPizza(item);
    }, [data]);

    return (
        <div>
            {error ? <Navigate to="/" replace={true} /> :
                <div>
                    <h1>Törlés</h1>
                    <p>
                        Biztosan törölni szeretné az "<b>{pizza.name}</b>"-t?
                    </p>
                    <button className="btn btn-danger" onClick={async() => {
                      try {
                        await axios.delete(`https://pizza.kando-dev.eu/Pizza/${pizza.id}`);
                        window.location.href = "/";
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
