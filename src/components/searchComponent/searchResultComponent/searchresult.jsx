import styles from './searchresult.module.css';
import { useState, useEffect } from 'react';

export default function SearchResult({ searchingProduct }) {
    // State to hold the background color of each cell
    const [cellColors, setCellColors] = useState({});

    // Function to update cell background colors based on searchingProduct
    useEffect(() => {
        // Create a map of indeks values as keys and red as values
        const updatedCellColors = {};
        searchingProduct.forEach((indeks) => {
            updatedCellColors[indeks] = 'red';
        });
        // Update the state with the new cell colors
        setCellColors(updatedCellColors);
    }, [searchingProduct]);

    return (
        <div className={`${styles.search_container}`}>
            <table className={styles.rack}>
                {[5, 4, 3, 2, 1].map((row) => (
                    <tr key={row}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Ł', 'M'].map((col) => (
                            <td
                                key={col}
                                className={`${styles.cell}`}
                                style={{ backgroundColor: cellColors[`${col}${row}`] || '' }}>
                                {col}
                                {row}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
