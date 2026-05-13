import TrainCard from "./TrainCard";

export default function TrainList({ trains }) {
    return (
        <div className="train-list">
            {trains.map((train) => (
                <TrainCard
                    key={train.id}
                    train={train}
                />
            ))}
        </div>
    );
}