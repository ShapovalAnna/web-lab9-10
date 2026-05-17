import { useState } from "react";
import { useLocation } from "react-router-dom";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";

export default function Home() {

    const location = useLocation();

    const [fromCity, setFromCity] =
        useState(
            location.state?.fromCity || ""
        );

    const [toCity, setToCity] =
        useState(
            location.state?.toCity || ""
        );

    const [date, setDate] =
        useState(
            location.state?.date || ""
        );

    const [filteredTrains, setFilteredTrains] =
        useState(
            location.state?.filteredTrains || []
        );

    const handleSearch = () => {

        const filtered = trains.filter(
            (train) => {

                const matchesFrom =
                    fromCity === "" ||
                    train.from
                        .toLowerCase()
                        .includes(
                            fromCity.toLowerCase()
                        );

                const matchesTo =
                    toCity === "" ||
                    train.to
                        .toLowerCase()
                        .includes(
                            toCity.toLowerCase()
                        );

                const matchesDate =
                    date === "" ||
                    train.departureDate === date;

                return (
                    matchesFrom &&
                    matchesTo &&
                    matchesDate
                );
            }
        );

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

                    <label>
                        Звідки
                    </label>

                    <input
                        list="fromCities"
                        placeholder="Введіть місто"
                        value={fromCity}
                        onChange={(e) =>
                            setFromCity(
                                e.target.value
                            )
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
                <button
                    className="swap-btn"
                    onClick={() => {

                        const temp =
                            fromCity;

                        setFromCity(toCity);

                        setToCity(temp);

                    }}
                >
                    ⇄
                </button>
                <div className="filter-group">

                    <label>
                        Куди
                    </label>

                    <input
                        list="toCities"
                        placeholder="Введіть місто"
                        value={toCity}
                        onChange={(e) =>
                            setToCity(
                                e.target.value
                            )
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

                    <label>
                        Дата
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(
                                e.target.value
                            )
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

                <TrainList
                    trains={filteredTrains}
                    fromCity={fromCity}
                    toCity={toCity}
                    date={date}
                />

            )}

        </div>

    );
}