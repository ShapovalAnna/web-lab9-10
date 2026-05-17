import { useState } from "react";

export default function BookingForm({
                                        train,
                                        name,
                                        setName,
                                        phone,
                                        setPhone,
                                        email,
                                        setEmail,
                                        handleBooking,
                                        selectedSeats = [],
                                        wagonTypes = {}
                                    }) {

    const [lastName, setLastName] = useState("");
    const [passengers, setPassengers] = useState([]);

    const getPriceForWagon = (wagonId) => {
        const allWagons = [
            ...(wagonTypes.platzkart || []),
            ...(wagonTypes.coupe || [])
        ];
        const wagon = allWagons.find((w) => w.id === wagonId);
        return wagon ? wagon.price : 0;
    };

    const total = selectedSeats.reduce(
        (sum, s) => sum + getPriceForWagon(s.wagon),
        0
    );

    const addPassenger = () => {
        setPassengers([
            ...passengers,
            { id: Date.now(), firstName: "", lastName: "" }
        ]);
    };

    const updatePassenger = (id, field, value) => {
        setPassengers(
            passengers.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            )
        );
    };

    const removePassenger = (id) => {
        setPassengers(passengers.filter((p) => p.id !== id));
    };

    return (
        <div className="booking-panel">

            {/* Train info */}
            {train && (
                <div className="panel-train-info">
                    <span className="panel-train-number">
                        {train.number} {train.name ? `- ${train.name}` : ""}
                    </span>
                    <div className="panel-train-times">
                        <span className="panel-time">{train.departureTime}</span>
                        <span className="panel-arrow">→</span>
                        <span className="panel-time">{train.arrivalTime}</span>
                    </div>
                    <div className="panel-train-route">
                        <span>{train.from}</span>
                        {train.duration && (
                            <span className="panel-duration">{train.duration}</span>
                        )}
                        <span>{train.to}</span>
                    </div>
                </div>
            )}

            {/* Tickets */}
            <div className="tickets-info">
                <h2>Квитки</h2>
                {selectedSeats.length === 0 ? (
                    <p className="no-seats">Місця не обрано</p>
                ) : (
                    <>
                        {selectedSeats.map((s) => (
                            <div key={`${s.wagon}-${s.seat}`} className="ticket-item">
                                <p>{s.wagon} вагон, {s.seat} місце</p>
                                <p>{getPriceForWagon(s.wagon)} грн</p>
                            </div>
                        ))}
                        <div className="ticket-divider" />
                        <div className="ticket-item ticket-total">
                            <p>Усього</p>
                            <p>{total} грн</p>
                        </div>
                    </>
                )}
            </div>

            {/* Passenger form */}
            <div className="booking-form">

                <div className="form-section-label">Пасажир 1</div>

                <div className="form-row">
                    <div className="form-field">
                        <label>Ім'я</label>
                        <input
                            type="text"
                            placeholder="Введіть ім'я"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label>Прізвище</label>
                        <input
                            type="text"
                            placeholder="Введіть прізвище"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        placeholder="+380 XX XXX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Extra passengers */}
                {passengers.map((p, index) => (
                    <div key={p.id} className="extra-passenger">
                        <div className="extra-passenger-header">
                            <span className="form-section-label" style={{ margin: 0 }}>
                                Пасажир {index + 2}
                            </span>
                            <button
                                className="remove-passenger-btn"
                                onClick={() => removePassenger(p.id)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="form-row">
                            <div className="form-field">
                                <label>Ім'я</label>
                                <input
                                    type="text"
                                    placeholder="Введіть ім'я"
                                    value={p.firstName}
                                    onChange={(e) =>
                                        updatePassenger(p.id, "firstName", e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-field">
                                <label>Прізвище</label>
                                <input
                                    type="text"
                                    placeholder="Введіть прізвище"
                                    value={p.lastName}
                                    onChange={(e) =>
                                        updatePassenger(p.id, "lastName", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button className="add-passenger-btn" onClick={addPassenger}>
                    + Додати пасажира
                </button>

            </div>

            <button className="confirm-btn" onClick={handleBooking}>
                Забронювати
            </button>

        </div>
    );
}