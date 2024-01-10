import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPizzaPage from "./components/ListPizzaPage";
import CreatePizzaPage from "./components/NewPizzaPage";
import UpdatePizzaPage from "./components/UpdatePizzaPage";
import DeletePizzaPage from "./components/DeletePizzaPage";
import NavbarComponent from "./components/NavbarComponent";
import store, { setPizzaData } from "./store";
import { Provider, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarComponent />,
		children: [
			{
				path: "/",
				element: <ListPizzaPage />,
			},
			{
				path: "/create",
				element: <CreatePizzaPage />,
			},
			{
				path: "/:id/edit",
				element: <UpdatePizzaPage />,
			},
			{
				path: "/:id/delete",
				element: <DeletePizzaPage />
			},
		]
    }
]);

export default function App() {
	const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            let res = await axios.get("https://pizza.kando-dev.eu/Pizza");
            dispatch(setPizzaData(res.data));
            setLoaded(true);
        })();
    }, []);

	if(!loaded) {
		return (
			<div className="d-flex flex-row min-vh-100 justify-content-center align-items-center">
				<Spinner animation="border" role="status" />
				<h1>Töltés...</h1>
            </div>
		)
	}

    return (
		<RouterProvider router={router}/>
    )
}

createRoot(document.getElementById("root")).render(<Provider store={store}><App /></Provider>);