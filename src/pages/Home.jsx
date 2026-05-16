import { useState } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";

export default function Home() {

    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [date, setDate] = useState("");

    const [filteredTrains, setFilteredTrains] =
        useState([]);

    const handleSearch = () => {

        const filtered = trains.filter((train) => {

            const matchesFrom =
                fromCity === "" ||
                train.from
                    .toLowerCase()
                    .includes(fromCity.toLowerCase());

            const matchesTo =
                toCity === "" ||
                train.to
                    .toLowerCase()
                    .includes(toCity.toLowerCase());

            const matchesDate =
                date === "" ||
                train.departureDate === date;

            return (
                matchesFrom &&
                matchesTo &&
                matchesDate
            );
        });

        setFilteredTrains(filtered);
    };

    const handleClear = () => {

        setFromCity("");
        setToCity("");
        setDate("");

        setFilteredTrains([]);
    };

    return (
        <div className="container">

            <h1>Квитки на потяг</h1>

            <div className="filter-box">

                <div className="filter-group">

                    <label>Звідки</label>

                    <input
                        list="fromCities"
                        placeholder="Введіть місто"
                        value={fromCity}
                        onChange={(e) =>
                            setFromCity(e.target.value)
                        }
                    />

                    <datalist id="fromCities">
                        <option value="Львів" />
                        <option value="Київ" />
                        <option value="Одеса" />
                        <option value="Харків" />
                        <option value="Дніпро" />
                        <option value="Ужгород" />
                    </datalist>

                </div>

                <div className="filter-group">

                    <label>Куди</label>

                    <input
                        list="toCities"
                        placeholder="Введіть місто"
                        value={toCity}
                        onChange={(e) =>
                            setToCity(e.target.value)
                        }
                    />

                    <datalist id="toCities">
                        <option value="Львів" />
                        <option value="Київ" />
                        <option value="Одеса" />
                        <option value="Харків" />
                        <option value="Дніпро" />
                        <option value="Ужгород" />
                    </datalist>

                </div>

                <div className="filter-group">

                    <label>Дата</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                        onClick={(e) =>
                            e.target.showPicker()
                        }
                    />

                </div>

                <div className="buttons">

                    <button
                        className="search-btn"
                        onClick={handleSearch}
                    >
                        Знайти
                    </button>

                    <button
                        className="clear-btn"
                        onClick={handleClear}
                    >
                        Очистити
                    </button>

                </div>

            </div>

            {filteredTrains.length > 0 && (
                <TrainList trains={filteredTrains} />
            )}

        </div>
    );
}