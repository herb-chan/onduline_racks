import { useState, useEffect } from 'react';
import styles from './view.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faBox } from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer } = window.require('electron');

export default function ViewAction({
    setCellInfo,
    setProductOnShelf,
    setActiveButton,
    setIsAddingButton,
    setIsAdding,
}) {
    const [cellProductsCount, setCellProductsCount] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShelvesDataWithDelay = setTimeout(() => {
            fetchShelvesData();
        }, 500);

        return () => clearTimeout(fetchShelvesDataWithDelay);
    }, []);

    const fetchShelvesData = async () => {
        try {
            const shelvesData = await ipcRenderer.invoke('fetchShelvesData');
            const counts = {};

            shelvesData.forEach((product) => {
                const cell = product.Cell;
                counts[cell] = counts[cell] ? counts[cell] + 1 : 1;
            });

            setCellProductsCount(counts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shelves data:', error);
        }
    };

    const handleClickingOnShelf = async (cellSymbol) => {
        setIsAddingButton(true);
        setIsAdding(false);
        try {
            const result = await ipcRenderer.invoke('searchTheCell', cellSymbol);

            if (result.length > 0) {
                setActiveButton('Wyszukaj');
                setProductOnShelf(result);
                setCellInfo(cellSymbol);
                setIsAdding(false);
                console.log(result, cellSymbol);
            } else {
                setActiveButton('Wyszukaj');
                setProductOnShelf('');
                setCellInfo(cellSymbol);
                setIsAdding(true);
            }
        } catch (error) {
            console.error('Error searching cell:', error);
        }
    };

    return (
        <div className={`${styles.view_container}`}>
            <table className={styles.rack}>
                {[5, 4, 3, 2, 1].map((row) => (
                    <tr key={row}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Ł', 'M'].map((col) => (
                            <td
                                key={col}
                                className={`${styles.clickable} ${styles.cell}`}
                                onClick={() => handleClickingOnShelf(`${col}${row}`)}>
                                <div className={styles.cell_inner}>
                                    <div
                                        className={`${styles.cell_symbol}`}
                                        style={{
                                            backgroundColor:
                                                cellProductsCount[`${col}${row}`] === 0
                                                    ? ''
                                                    : cellProductsCount[`${col}${row}`] === 1
                                                    ? '#48b871'
                                                    : cellProductsCount[`${col}${row}`] === 2
                                                    ? '#f3b255'
                                                    : cellProductsCount[`${col}${row}`] >= 3
                                                    ? '#e16369'
                                                    : '',
                                        }}>
                                        {col}
                                        {row}
                                    </div>
                                    <div className={styles.cell_info}>
                                        <span className={styles.product_count}>
                                            {loading ? (
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className={`${styles.loading_icon}`}
                                                />
                                            ) : cellProductsCount[`${col}${row}`] > 0 ? (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faBox}
                                                        className={styles.box_icon}
                                                        style={{
                                                            color:
                                                                cellProductsCount[`${col}${row}`] === 0
                                                                    ? ''
                                                                    : cellProductsCount[`${col}${row}`] === 1
                                                                    ? '#48b871'
                                                                    : cellProductsCount[`${col}${row}`] === 2
                                                                    ? '#f3b255'
                                                                    : cellProductsCount[`${col}${row}`] >= 3
                                                                    ? '#e16369'
                                                                    : '',
                                                        }}
                                                    />{' '}
                                                    Ilość: {cellProductsCount[`${col}${row}`]}
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
