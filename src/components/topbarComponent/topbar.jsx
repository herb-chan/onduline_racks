import styles from './topbar.module.css';

export default function TopBar({ activeButton, searchingProduct }) {
    return (
        <div className={styles.topbar_container}>
            <h1>
                {activeButton === 'Wyświetl' && !searchingProduct ? (
                    <span>
                        Aktualnie <span className={styles.wyświetl}>wyświetlasz</span> produkty
                    </span>
                ) : (
                    ''
                )}
                {activeButton === 'Wyszukaj' && !searchingProduct ? (
                    <span>
                        Aktualnie <span className={styles.wyszukaj}>wyszukujesz</span> produkty
                    </span>
                ) : (
                    ''
                )}
                {searchingProduct ? (
                    <span>
                        Wynik <span className={styles.wyszukaj}>wyszukiwania</span> dla{' '}
                        <span className={styles.wyszukaj}>{searchingProduct[0].indeks}</span>
                    </span>
                ) : (
                    ''
                )}
            </h1>
        </div>
    );
}
