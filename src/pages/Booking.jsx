import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { trains } from "../data/trains";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import { saveBooking, getBookings } from "../services/BookingService";

export default function Booking() {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const train = trains.find(
        (train) => train.id === Number(id)
    );

    const wagonTypes = {
        platzkart: [
            {
                id: 1,
                seats: 30,
                price: 456
            },
            {
                id: 2,
                seats: 30,
                price: 456
            }
        ],

        coupe: [
            {
                id: 3,
                seats: 20,
                price: 985
            },
            {
                id: 4,
                seats: 20,
                price: 985
            }
        ]
    };

    const [wagonType, setWagonType] =
        useState("platzkart");

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

    const currentWagons =
        wagonTypes[wagonType];


    const bookings = getBookings();

    const wagonSeats = {

        1: Array.from(
            { length: 30 },
            (_, index) => ({
                id: index + 1,

                booked:
                    bookings.some(
                        (booking) =>

                            booking.trainId ===
                            train.id &&

                            booking.wagon === 1 &&

                            booking.seats.includes(
                                index + 1
                            )
                    )
            })
        ),

        2: Array.from(
            { length: 30 },
            (_, index) => ({
                id: index + 1,

                booked:
                    bookings.some(
                        (booking) =>

                            booking.trainId ===
                            train.id &&

                            booking.wagon === 2 &&

                            booking.seats.includes(
                                index + 1
                            )
                    )
            })
        ),

        3: Array.from(
            { length: 20 },
            (_, index) => ({
                id: index + 1,

                booked:
                    bookings.some(
                        (booking) =>

                            booking.trainId ===
                            train.id &&

                            booking.wagon === 3 &&

                            booking.seats.includes(
                                index + 1
                            )
                    )
            })
        ),

        4: Array.from(
            { length: 20 },
            (_, index) => ({
                id: index + 1,

                booked:
                    bookings.some(
                        (booking) =>

                            booking.trainId ===
                            train.id &&

                            booking.wagon === 4 &&

                            booking.seats.includes(
                                index + 1
                            )
                    )
            })
        )
    };

    const seats =
        wagonSeats[selectedWagon];

    const toggleSeat = (seatId) => {

        const seat = seats.find(
            (seat) => seat.id === seatId
        );

        if (seat.booked) {
            return;
        }

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

        window.location.reload();
    };
    return (
        <div className="booking-page">
            <button
                className="back-btn"
                onClick={() =>
                    navigate("/", {
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
                <h2>Потяг {train.number}</h2>

                <p>{train.from} → {train.to}</p>
                <p>{train.departureDate}</p>

                <p>
                    {train.departureTime}
                    {" - "}
                    {train.arrivalTime}
                </p>

            </div>
            <div className="wagon-types">
                <button
                    className={
                        wagonType === "platzkart"
                            ? "type-btn active"
                            : "type-btn"
                    }
                    onClick={() => {

                        setWagonType("platzkart");
                        setSelectedWagon(1);
                        setSelectedSeats([]);
                    }}
                >
                    Плацкарт
                </button>
                <button
                    className={
                        wagonType === "coupe"
                            ? "type-btn active"
                            : "type-btn"
                    }
                    onClick={() => {

                        setWagonType("coupe");
                        setSelectedWagon(3);
                        setSelectedSeats([]);

                    }}
                >
                    Купе
                </button>

            </div>
            <WagonSelector
                wagons={currentWagons}
                selectedWagon={selectedWagon}
                setSelectedWagon={setSelectedWagon}
            />

            <SeatMap
                seats={seats}
                selectedSeats={selectedSeats}
                toggleSeat={toggleSeat}
            />
            <div className="tickets-info">
                <h2>Квитки</h2>
                {selectedSeats.map((seat) => (

                    <div
                        key={seat}
                        className="ticket-item"
                    >

                        <p>
                            {selectedWagon} вагон,
                            {seat} місце
                        </p>
                        <p>
                            {
                                wagonType === "platzkart"
                                    ? "456 грн"
                                    : "985 грн"
                            }
                        </p>

                    </div>

                ))}

                <h3>
                    Всього:
                    {" "}
                    {
                        selectedSeats.length *
                        (
                            wagonType === "platzkart"
                                ? 456
                                : 985
                        )
                    }
                    грн
                </h3>

            </div>

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