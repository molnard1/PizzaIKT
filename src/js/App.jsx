import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPizzaPage from "./components/ListPizzaPage";
import CreatePizzaPage from "./components/NewPizzaPage";
import UpdatePizzaPage from "./components/UpdatePizzaPage";
import DeletePizzaPage from "./components/DeletePizzaPage";
import NavbarComponent from "./components/NavbarComponent";
import store from "./store";
import { Provider } from "react-redux";

class ErrorBoundary extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { hasError: false };
	}
  
	static getDerivedStateFromError(error) {
	  return { hasError: true };
	}
  
	render() {
	  if (this.state.hasError) {
		return this.props.fallback;
	  }
  
	  return this.props.children;
	}
  }

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
    return (
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
    )
}

createRoot(document.getElementById("root")).render(<App />);