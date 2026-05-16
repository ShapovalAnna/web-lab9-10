import { useNavigate } from "react-router-dom";

export default function TrainCard({train, fromCity, toCity, date, filteredTrains}) {

    const navigate = useNavigate();
    return (

        <div
            className="card"
            onClick={() =>

                navigate(
                    `/booking/${train.id}`,
                    {
                        state: {
                            fromCity,
                            toCity,
                            date,
                            filteredTrains
                        }
                    }
                )

            }
        >

            <h2>
                Потяг {train.number}
            </h2>

            <div className="route-info">

                <div className="time-block">

                    <h3>
                        {train.departureTime}
                    </h3>

                    <p>
                        {train.departureDate}
                    </p>

                    <strong>
                        {train.from}
                    </strong>

                </div>

                <div className="duration-block">

                    <div className="line"></div>

                    <span>
                        {train.duration}
                    </span>

                    <div className="line"></div>

                </div>

                <div className="time-block">

                    <h3>
                        {train.arrivalTime}
                    </h3>

                    <p>
                        {train.arrivalDate}
                    </p>

                    <strong>
                        {train.to}
                    </strong>

                </div>

            </div>

        </div>

    );
}