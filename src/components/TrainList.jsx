import TrainCard from "./TrainCard";

export default function TrainList({trains, fromCity, toCity, date}) {
    return (

        <div className="train-list">
            {trains.map((train) => (

                <TrainCard
                    key={train.id}
                    train={train}
                    fromCity={fromCity}
                    toCity={toCity}
                    date={date}
                    filteredTrains={trains}
                />
            ))}
        </div>

    );
}