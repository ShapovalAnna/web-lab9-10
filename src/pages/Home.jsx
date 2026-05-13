import { useState } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";

export default function Home() {
    const [search, setSearch] = useState("");

    const filteredTrains = trains.filter((train) =>
        train.number.toLowerCase().includes(search.toLowerCase()) ||
        train.from.toLowerCase().includes(search.toLowerCase()) ||
        train.to.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Квитки на потяг</h1>

            <input
                type="text"
                placeholder="Пошук за номером або містом..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TrainList trains={filteredTrains} />
        </div>
    );
}