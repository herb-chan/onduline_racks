import styles from './topbar.module.css';

export default function TopBar({ activeButton, searchingProduct, cellInfo }) {
    return (
        <div className={styles.topbar_container}>
            <h1>
                {activeButton === 'Wyświetl' && !searchingProduct && !cellInfo ? (
                    <span>
                        Aktualnie <span className={styles.wyświetl}>wyświetlasz</span> produkty
                    </span>
                ) : (
                    ''
                )}
                {activeButton === 'Wyszukaj' && !searchingProduct && !cellInfo ? (
                    <span>
                        Aktualnie <span className={styles.wyszukaj}>wyszukujesz</span> produkty
                    </span>
                ) : (
                    ''
                )}
                {searchingProduct && !cellInfo ? (
                    <span>
                        Wynik <span className={styles.wyszukaj}>wyszukiwania</span>
                    </span>
                ) : (
                    ''
                )}
                {cellInfo ? (
                    <span>
                        Podgląd dla półki <span className={styles.wyszukaj}>{cellInfo}</span>
                    </span>
                ) : (
                    ''
                )}
            </h1>
        </div>
    );
}
