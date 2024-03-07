import styles from './searchresult.module.css';
import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

export default function SearchResult({ searchingProduct, setCellInfo, setProductOnShelf }) {
    const [cellColors, setCellColors] = useState({});
    const [cellCounts, setCellCounts] = useState({});
    const [oldestCell, setOldestCell] = useState('');
    const [recentCell, setRecentCell] = useState('');

    const onCellWithProductClick = async (symbol, productIndeks) => {
        console.log(symbol);
        console.log(productIndeks);
        const result = await ipcRenderer.invoke('searchByCell', symbol, productIndeks);
        setCellInfo(symbol);
        setProductOnShelf(result);
        console.log('Search result:', result, typeof result);
    };

    useEffect(() => {
        if (searchingProduct.length === 0) {
            return; // No products to process
        }

        // Find oldest and most recent dates
        let oldestDate = new Date(searchingProduct[0].date);
        let mostRecentDate = new Date(searchingProduct[0].date);

        searchingProduct.forEach((product) => {
            const productDate = new Date(product.date);
            if (productDate < oldestDate) {
                oldestDate = productDate;
            }
            if (productDate > mostRecentDate) {
                mostRecentDate = productDate;
            }
        });

        const updatedCellColors = {};
        const updatedCellCounts = {};

        searchingProduct.forEach((product) => {
            const cell_symbol = product.cell;
            updatedCellCounts[cell_symbol] = (updatedCellCounts[cell_symbol] || 0) + 1;

            const productDate = new Date(product.date);
            if (productDate.getTime() === oldestDate.getTime()) {
                updatedCellColors[cell_symbol] = '#e16369'; // Set to red color
                setOldestCell(product.cell); // Set oldest product
            } else if (productDate.getTime() === mostRecentDate.getTime()) {
                updatedCellColors[cell_symbol] = '#48b871'; // Set to green color
                setRecentCell(product.cell); // Set most recent product
            } else {
                updatedCellColors[cell_symbol] = '#48b871'; // Default color
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
                                    onClick={
                                        hasProduct
                                            ? () => onCellWithProductClick(cellSymbol, searchingProduct[0]['indeks'])
                                            : undefined
                                    }>
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
                                                        <span className={styles.recent}>Najnowszy</span>
                                                        <span className={styles.blank}>oraz</span>
                                                        <span className={styles.oldest}>Najstarszy</span>
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
