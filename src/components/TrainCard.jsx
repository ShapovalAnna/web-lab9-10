export default function TrainCard({ train }) {
    return (
        <div className="card">
            <h2>Потяг {train.number}</h2>

            <p>
                <strong>Маршрут:</strong>{" "}
                {train.from} → {train.to}
            </p>

            <p>
                <strong>Дата відправлення:</strong>{" "}
                {train.departureDate}
            </p>

            <p>
                <strong>Час відправлення:</strong>{" "}
                {train.departureTime}
            </p>

            <p>
                <strong>Тривалість поїздки:</strong>{" "}
                {train.duration}
            </p>
        </div>
    );
}