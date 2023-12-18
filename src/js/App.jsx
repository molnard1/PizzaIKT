import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPizzaPage from "./components/ListPizzaPage";
import CreatePizzaPage from "./components/NewPizzaPage";
import UpdatePizzaPage from "./components/UpdatePizzaPage";
import DeletePizzaPage from "./components/DeletePizzaPage";
import NavbarComponent from "./components/NavbarComponent";

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
				element: <DeletePizzaPage />,
			},
		]
    }
]);

export default function App() {
    return (
		<RouterProvider router={router}/>
    )
}

createRoot(document.getElementById("root")).render(<App />);