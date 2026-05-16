export default function WagonSelector({
                                          wagons,
                                          selectedWagon,
                                          setSelectedWagon
                                      }) {

    return (

        <div className="wagon-selector">
            {wagons.map((wagon) => (
                <div
                    key={wagon.id}
                    className="wagon-block"
                >
                    <h3>
                        Вагон {wagon.id}
                    </h3>
                    <button
                        className={
                            selectedWagon === wagon.id
                                ? "wagon-btn active"
                                : "wagon-btn"
                        }
                        onClick={() =>
                            setSelectedWagon(
                                wagon.id
                            )
                        }
                    >
                        Обрати
                    </button>

                </div>

            ))}

        </div>

    );
}