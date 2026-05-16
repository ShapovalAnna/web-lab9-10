import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { trains } from "../data/trains";

import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";

import { saveBooking } from "../services/BookingService";

export default function Booking() {

    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();

    const train = trains.find(
        (train) => train.id === Number(id)
    );

    const wagons = [1, 2, 3, 4];

    const [selectedWagon, setSelectedWagon] =
        useState(1);

    const [selectedSeats, setSelectedSeats] =
        useState([]);

    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [email, setEmail] =
        useState("");

    const seats = Array.from(
        { length: 36 },
        (_, index) => ({
            id: index + 1,
            booked: false
        })
    );

    const toggleSeat = (seatId) => {

        if (
            selectedSeats.includes(seatId)
        ) {

            setSelectedSeats(
                selectedSeats.filter(
                    (id) => id !== seatId
                )
            );

        } else {

            setSelectedSeats([
                ...selectedSeats,
                seatId
            ]);
        }
    };

    const handleBooking = () => {

        if (
            !name ||
            !phone ||
            !email
        ) {

            alert("Заповніть всі поля");
            return;
        }

        if (
            selectedSeats.length === 0
        ) {

            alert("Оберіть місця");
            return;
        }

        const booking = {

            trainId: train.id,

            wagon: selectedWagon,

            seats: selectedSeats,

            name,
            phone,
            email
        };

        saveBooking(booking);

        alert("Бронювання успішне");

        setSelectedSeats([]);
        setName("");
        setPhone("");
        setEmail("");
    };

    return (

        <div className="booking-page">

            <button
                className="back-btn"
                onClick={() =>
                    navigate(
                        "/",
                        {
                            state: {
                                fromCity:
                                location.state?.fromCity,

                                toCity:
                                location.state?.toCity,

                                date:
                                location.state?.date,

                                filteredTrains:
                                location.state?.filteredTrains
                            }
                        }
                    )
                }
            >
                ← Назад
            </button>

            <h1>Бронювання квитків</h1>

            <div className="selected-train">

                <h2>
                    Потяг {train.number}
                </h2>

                <p>
                    {train.from} → {train.to}
                </p>

                <p>
                    {train.departureDate}
                </p>

                <p>
                    {train.departureTime}
                    {" - "}
                    {train.arrivalTime}
                </p>

            </div>

            <WagonSelector
                wagons={wagons}
                selectedWagon={selectedWagon}
                setSelectedWagon={setSelectedWagon}
            />

            <SeatMap
                seats={seats}
                selectedSeats={selectedSeats}
                toggleSeat={toggleSeat}
            />

            <BookingForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                handleBooking={handleBooking}
            />

        </div>

    );
}