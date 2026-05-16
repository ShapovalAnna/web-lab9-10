import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { trains } from "../data/trains";
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

    const bookings =
        getBookings();

    const handleSeatClick = (
        wagonId,
        seatId,
        booked
    ) => {

        if (booked) {
            return;
        }

        const alreadySelected =
            selectedSeats.some(
                (selectedSeat) =>

                    selectedSeat.wagon === wagonId &&

                    selectedSeat.seat === seatId
            );

        if (alreadySelected) {

            setSelectedSeats(
                selectedSeats.filter(
                    (selectedSeat) =>

                        !(
                            selectedSeat.wagon === wagonId &&

                            selectedSeat.seat === seatId
                        )
                )
            );

        } else {

            setSelectedSeats([
                ...selectedSeats,

                {
                    wagon: wagonId,
                    seat: seatId
                }
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

            <div className="booking-layout">

                <div className="booking-left">

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

                    <div className="wagon-types">

                        <button
                            className={
                                wagonType === "platzkart"
                                    ? "type-btn active"
                                    : "type-btn"
                            }
                            onClick={() => {

                                setWagonType("platzkart");

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

                                setSelectedSeats([]);

                            }}
                        >
                            Купе
                        </button>

                    </div>

                    <div className="wagons-container">

                        {currentWagons.map((wagon) => {

                            const seats = Array.from(
                                { length: wagon.seats },
                                (_, index) => ({

                                    id: index + 1,

                                    booked:
                                        bookings.some(
                                            (booking) =>

                                                booking.trainId ===
                                                train.id &&

                                                booking.seats.some(
                                                    (seat) =>

                                                        seat.wagon === wagon.id &&

                                                        seat.seat === index + 1
                                                )
                                        )
                                })
                            );

                            return (

                                <div
                                    key={wagon.id}
                                    className="wagon-block"
                                >

                                    <h2>
                                        Вагон {wagon.id}
                                    </h2>

                                    <div className="seats-grid">

                                        {seats.map((seat) => (

                                            <button
                                                key={seat.id}

                                                className={

                                                    seat.booked

                                                        ? "seat booked"

                                                        : selectedSeats.some(
                                                            (selectedSeat) =>

                                                                selectedSeat.wagon === wagon.id &&

                                                                selectedSeat.seat === seat.id
                                                        )

                                                            ? "seat selected"

                                                            : "seat"
                                                }

                                                onClick={() =>
                                                    handleSeatClick(
                                                        wagon.id,
                                                        seat.id,
                                                        seat.booked
                                                    )
                                                }
                                            >
                                                {seat.id}
                                            </button>

                                        ))}

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

                <div className="booking-right">

                    <div className="tickets-info">

                        <h2>
                            Квитки
                        </h2>

                        {selectedSeats.map(
                            (selectedSeat) => (

                                <div
                                    key={
                                        `${selectedSeat.wagon}-${selectedSeat.seat}`
                                    }

                                    className="ticket-item"
                                >

                                    <p>
                                        {selectedSeat.wagon}
                                        {" "}
                                        вагон,
                                        {" "}
                                        {selectedSeat.seat}
                                        {" "}
                                        місце
                                    </p>

                                    <p>

                                        {

                                            selectedSeat.wagon === 1 ||

                                            selectedSeat.wagon === 2

                                                ? "456 грн"

                                                : "985 грн"

                                        }

                                    </p>

                                </div>

                            )
                        )}

                        <h3>

                            Всього:

                            {" "}

                            {

                                selectedSeats.reduce(
                                    (
                                        total,
                                        seat
                                    ) => {

                                        if (

                                            seat.wagon === 1 ||

                                            seat.wagon === 2

                                        ) {

                                            return total + 456;
                                        }

                                        return total + 985;

                                    },
                                    0
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

            </div>

        </div>

    );
}