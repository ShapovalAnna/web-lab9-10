export default function SeatMap({
                                    seats,
                                    selectedSeats,
                                    toggleSeat
                                }) {

    return (

        <div className="seat-map">

            <h2>Оберіть місця</h2>

            <div className="seats-grid">

                {seats.map((seat) => {

                    const isSelected =
                        selectedSeats.includes(seat.id);

                    return (

                        <button
                            key={seat.id}
                            disabled={seat.booked}
                            className={
                                seat.booked
                                    ? "seat booked"
                                    : isSelected
                                        ? "seat selected"
                                        : "seat"
                            }
                            onClick={() =>
                                toggleSeat(seat.id)
                            }
                        >
                            {seat.id}
                        </button>

                    );
                })}

            </div>

        </div>

    );
}