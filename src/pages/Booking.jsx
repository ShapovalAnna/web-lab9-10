import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { trains } from "../data/trains";
import BookingForm from "../components/BookingForm";
import { saveBooking, getBookings } from "../services/BookingService";

export default function Booking() {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const train = trains.find((t) => t.id === Number(id));

    const wagonTypes = {
        platzkart: [
            { id: 1, seats: 30, price: 456 },
            { id: 2, seats: 30, price: 456 },
            { id: 3, seats: 30, price: 456 },
            { id: 4, seats: 30, price: 456 }
        ],
        coupe: [
            { id: 5, seats: 20, price: 985 },
            { id: 6, seats: 20, price: 985 }
        ]
    };

    const [wagonType, setWagonType] = useState("platzkart");
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const currentWagons = wagonTypes[wagonType];
    const bookings = getBookings();

    const handleSeatClick = (wagonId, seatId, booked) => {
        if (booked) return;
        const alreadySelected = selectedSeats.some(
            (s) => s.wagon === wagonId && s.seat === seatId
        );
        if (alreadySelected) {
            setSelectedSeats(selectedSeats.filter(
                (s) => !(s.wagon === wagonId && s.seat === seatId)
            ));
        } else {
            setSelectedSeats([...selectedSeats, { wagon: wagonId, seat: seatId }]);
        }
    };

    const handleBooking = () => {
        if (!name || !phone || !email) { alert("Заповніть всі поля"); return; }
        if (selectedSeats.length === 0) { alert("Оберіть місця"); return; }
        saveBooking({ trainId: train.id, seats: selectedSeats, name, phone, email });
        alert("Бронювання успішне");
        window.location.reload();
    };

    const getSeatClass = (seat, wagonId) => {
        if (seat.booked) return "seat booked";
        if (selectedSeats.some((s) => s.wagon === wagonId && s.seat === seat.id))
            return "seat selected";
        return "seat";
    };

    return (
        <div className="booking-page">

            <button
                className="back-btn"
                onClick={() => navigate("/", {
                    state: {
                        fromCity: location.state?.fromCity,
                        toCity: location.state?.toCity,
                        date: location.state?.date,
                        filteredTrains: location.state?.filteredTrains
                    }
                })}
            >
                ← Назад
            </button>

            <h1>Бронювання квитків</h1>

            <div className="booking-layout">

                {/* LEFT */}
                <div className="booking-left">

                    <div className="wagon-types">
                        <button
                            className={wagonType === "platzkart" ? "type-btn active" : "type-btn"}
                            onClick={() => { setWagonType("platzkart"); setSelectedSeats([]); }}
                        >
                            Плацкарт
                        </button>
                        <button
                            className={wagonType === "coupe" ? "type-btn active" : "type-btn"}
                            onClick={() => { setWagonType("coupe"); setSelectedSeats([]); }}
                        >
                            Купе
                        </button>
                    </div>

                    <div className="wagons-container">
                        {currentWagons.map((wagon) => {

                            const seats = Array.from(
                                { length: wagon.seats },
                                (_, i) => ({
                                    id: i + 1,
                                    booked: bookings.some(
                                        (b) =>
                                            b.trainId === train.id &&
                                            b.seats.some((s) => s.wagon === wagon.id && s.seat === i + 1)
                                    )
                                })
                            );

                            // Верхні місця: 1–20 (5 блоків по 4)
                            const mainSeats = seats.slice(0, 20);
                            // Бокові місця: 21–30 (5 пар)
                            const sideSeats = seats.slice(20, 30);

                            return (
                                <div key={wagon.id} className="wagon-block">
                                    <h2>Вагон {wagon.id}</h2>

                                    <div className="wagon-inner">

                                        {/* Верхні місця */}
                                        <div className="wagon-seats">

                                            <div className="wc">WC</div>

                                            <div className="main-seats">
                                                {Array.from({ length: 5 }, (_, blockIndex) => {
                                                    const block = mainSeats.slice(blockIndex * 4, blockIndex * 4 + 4);
                                                    return (
                                                        <div key={blockIndex} className="seat-block">
                                                            <div className="seat-column">
                                                                {block[0] && (
                                                                    <button
                                                                        className={getSeatClass(block[0], wagon.id)}
                                                                        onClick={() => handleSeatClick(wagon.id, block[0].id, block[0].booked)}
                                                                    >
                                                                        {block[0].id}
                                                                    </button>
                                                                )}
                                                                {block[1] && (
                                                                    <button
                                                                        className={getSeatClass(block[1], wagon.id)}
                                                                        onClick={() => handleSeatClick(wagon.id, block[1].id, block[1].booked)}
                                                                    >
                                                                        {block[1].id}
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="seat-column">
                                                                {block[2] && (
                                                                    <button
                                                                        className={getSeatClass(block[2], wagon.id)}
                                                                        onClick={() => handleSeatClick(wagon.id, block[2].id, block[2].booked)}
                                                                    >
                                                                        {block[2].id}
                                                                    </button>
                                                                )}
                                                                {block[3] && (
                                                                    <button
                                                                        className={getSeatClass(block[3], wagon.id)}
                                                                        onClick={() => handleSeatClick(wagon.id, block[3].id, block[3].booked)}
                                                                    >
                                                                        {block[3].id}
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {blockIndex < 4 && <div className="wagon-divider" />}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="wc">WC</div>

                                        </div>

                                        {/* Бокові місця (тільки плацкарт) */}
                                        {wagon.seats === 30 && (
                                            <div className="side-seats">
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    const pair = sideSeats.slice(i * 2, i * 2 + 2);
                                                    return (
                                                        <div key={i} className="side-block">
                                                            <div className="side-seat-group">
                                                                {pair.map((seat) => (
                                                                    <button
                                                                        key={seat.id}
                                                                        className={getSeatClass(seat, wagon.id)}
                                                                        onClick={() => handleSeatClick(wagon.id, seat.id, seat.booked)}
                                                                    >
                                                                        {seat.id}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {i < 4 && <div className="side-divider" />}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                {/* RIGHT */}
                <div className="booking-right">
                    <BookingForm
                        train={train}
                        name={name}
                        setName={setName}
                        phone={phone}
                        setPhone={setPhone}
                        email={email}
                        setEmail={setEmail}
                        handleBooking={handleBooking}
                        selectedSeats={selectedSeats}
                        wagonTypes={wagonTypes}
                    />
                </div>

            </div>
        </div>
    );
}