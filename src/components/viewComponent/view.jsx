import { useState, useEffect } from 'react';
import styles from './view.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faBox } from '@fortawesome/free-solid-svg-icons';
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
            <div className={styles.rack}>
                {[5, 4, 3, 2, 1].map((row) => (
                    <div className={styles.rack_row} key={row}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Ł', 'M'].map((col) => (
                            <div
                                className={`${styles.rack_cell} ${
                                    col === 'K' && (row === 1 || row === 2) ? '' : styles.rack_cell_clickable
                                } ${styles[col]} ${styles[col + row]}`}
                                key={col}
                                onClick={() => {
                                    if (col !== 'K' && (row !== 1 || row !== 2)) {
                                        handleClickingOnShelf(`${col}${row}`);
                                    } else if (col === 'K' && (row === 3 || row === 4 || row === 5)) {
                                        handleClickingOnShelf(`${col}${row}`);
                                    }
                                }}>
                                <div
                                    className={`${styles.rack_cell_symbol}`}
                                    style={{
                                        backgroundColor:
                                            cellProductsCount[`${col}${row}`] === 0
                                                ? ''
                                                : cellProductsCount[`${col}${row}`] === 1
                                                ? '#7bed9f'
                                                : cellProductsCount[`${col}${row}`] === 2
                                                ? '#eccc68'
                                                : cellProductsCount[`${col}${row}`] >= 3
                                                ? '#ff6b81'
                                                : '',
                                    }}>
                                    {col}
                                    {row}
                                </div>
                                <div className={styles.rack_cell_info}>
                                    <span className={styles.product_count}>
                                        {loading ? (
                                            <FontAwesomeIcon
                                                icon={faCircleNotch}
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
                                                                ? '#7bed9f'
                                                                : cellProductsCount[`${col}${row}`] === 2
                                                                ? '#eccc68'
                                                                : cellProductsCount[`${col}${row}`] >= 3
                                                                ? '#ff6b81'
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
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
