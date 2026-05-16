import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

import "./App.css";

export default function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/booking/:id"
                element={<Booking />}
            />

        </Routes>
    );
}