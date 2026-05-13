export default function TrainCard({ train }) {

    return (
        <div className="card">

            <h2>Потяг {train.number}</h2>

            <div className="route-info">

                <div className="time-block">
                    <h3>{train.departureTime}</h3>

                    <p>{train.departureDate}</p>

                    <strong>{train.from}</strong>
                </div>

                <div className="duration-block">

                    <div className="line"></div>

                    <span>{train.duration}</span>

                    <div className="line"></div>

                </div>

                <div className="time-block">
                    <h3>{train.arrivalTime}</h3>

                    <p>{train.arrivalDate}</p>

                    <strong>{train.to}</strong>
                </div>

            </div>

        </div>
    );
}