import axios from "axios";
import React, { useEffect, useState } from "react";
export default function DeletePizzaPage() {
    const [pizzaName, setPizzaName] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://pizza.kando-dev.eu/Pizza/${window.location.pathname.split("/")[1]}`);
        setPizzaName(res.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (
        <div>
            <h1>Törlés</h1>
            <p>
                Biztosan törölni szeretné az "<b>{pizzaName}</b>"-t?
            </p>
            <button className="btn btn-danger" onClick={async() => {
              try {
                await axios.delete(`https://pizza.kando-dev.eu/Pizza/${window.location.pathname.split("/")[1]}`);
                window.location.href = "/";
              } catch (error) {
                alert(error);
              }
            }} style={{ marginRight: '10px' }}>Törlés</button>
            <button className="btn btn-secondary" onClick={() => window.history.back()}>Mégse</button>
        </div>
    )
}