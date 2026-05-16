export default function BookingForm({
                                        name,
                                        setName,
                                        phone,
                                        setPhone,
                                        email,
                                        setEmail,
                                        handleBooking
                                    }) {

    return (

        <div className="booking-form">

            <h2>Дані пасажира</h2>

            <input
                type="text"
                placeholder="Ім’я"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Телефон"
                value={phone}
                onChange={(e) =>
                    setPhone(e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <button
                className="confirm-btn"
                onClick={handleBooking}
            >
                Забронювати
            </button>

        </div>

    );
}