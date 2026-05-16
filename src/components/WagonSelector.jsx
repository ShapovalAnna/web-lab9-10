export default function WagonSelector({
                                          wagons,
                                          selectedWagon,
                                          setSelectedWagon
                                      }) {

    return (

        <div className="wagon-selector">

            <h2>Оберіть вагон</h2>

            <div className="wagon-list">

                {wagons.map((wagon) => (

                    <button
                        key={wagon}
                        className={
                            selectedWagon === wagon
                                ? "wagon-btn active"
                                : "wagon-btn"
                        }
                        onClick={() =>
                            setSelectedWagon(wagon)
                        }
                    >
                        Вагон {wagon}
                    </button>

                ))}

            </div>

        </div>

    );
}