import styles from './searchresult.module.css';
import { useState, useEffect } from 'react';

export default function SearchResult({ searchingProduct }) {
    const [cellColors, setCellColors] = useState({});
    const [cellCounts, setCellCounts] = useState({});
    const [oldestCell, setOldestCell] = useState('');
    const [recentCell, setRecentCell] = useState('');

    const onCellWithProductClick = async (symbol) => {
        console.log(symbol);
    };

    useEffect(() => {
        if (searchingProduct.length === 0) {
            return; // Brak produktów do przetworzenia
        }

        // Znajdź najstarszą i najnowszą datę
        let oldestDate = searchingProduct[0].date;
        let mostRecentDate = searchingProduct[0].date;

        searchingProduct.forEach((product) => {
            if (product.date < oldestDate) {
                oldestDate = product.date;
            }
            if (product.date > mostRecentDate) {
                mostRecentDate = product.date;
            }
        });

        const updatedCellColors = {};
        const updatedCellCounts = {};

        searchingProduct.forEach((product) => {
            let cell_symbol = product.cell;
            updatedCellCounts[cell_symbol] = (updatedCellCounts[cell_symbol] || 0) + 1;

            if (product.date === oldestDate && product.date === mostRecentDate) {
                updatedCellColors[cell_symbol] = '#e16369'; // Ustawiamy na czerwony kolor
                setOldestCell(product.cell); // Ustawiamy najstarszy produkt
                setRecentCell(''); // Czyścimy najnowszy produkt
            } else if (product.date === oldestDate) {
                updatedCellColors[cell_symbol] = '#e16369'; // Ustawiamy na czerwony kolor
                setOldestCell(product.cell); // Ustawiamy najstarszy produkt
            } else if (product.date === mostRecentDate) {
                updatedCellColors[cell_symbol] = '#48b871'; // Ustawiamy na zielony kolor
                setRecentCell(product.cell); // Ustawiamy najnowszy produkt
            } else {
                updatedCellColors[cell_symbol] = '#f3b255'; // Domyślny kolor
            }
        });

        setCellColors(updatedCellColors);
        setCellCounts(updatedCellCounts);
    }, [searchingProduct]);

    return (
        <div className={`${styles.search_container}`}>
            <table className={styles.rack}>
                {[5, 4, 3, 2, 1].map((row) => (
                    <tr key={row}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Ł', 'M'].map((col) => {
                            const cellSymbol = `${col}${row}`;
                            const hasProduct = cellCounts[cellSymbol] > 0;
                            return (
                                <td
                                    key={col}
                                    className={`${styles.cell} ${hasProduct ? styles.cell_with_product : ''}`}
                                    onClick={hasProduct ? () => onCellWithProductClick(cellSymbol) : undefined}>
                                    <div className={styles.cell_inner}>
                                        <div
                                            className={styles.cell_symbol}
                                            style={{ backgroundColor: cellColors[cellSymbol] || '' }}>
                                            {col}
                                            {row}
                                        </div>
                                        <div className={styles.cell_info}>
                                            <span style={{ color: cellColors[cellSymbol] || '' }}>
                                                {oldestCell === cellSymbol && recentCell !== cellSymbol && 'Najstarszy'}
                                                {recentCell === cellSymbol && oldestCell !== cellSymbol && 'Najnowszy'}
                                                {recentCell === cellSymbol && oldestCell === cellSymbol && (
                                                    <span className={styles.when_both}>
                                                        Najnowszy<span className={styles.blank}>oraz</span>
                                                        <span className={styles.oldest}>najstarszy</span>
                                                    </span>
                                                )}
                                            </span>
                                            {cellCounts[cellSymbol] && (
                                                <span className={styles.counter}>Ilość: {cellCounts[cellSymbol]}</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </table>
        </div>
    );
}
