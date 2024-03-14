import styles from './searchCell.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faClock, faQrcode, faHashtag, faClipboard, faPlus } from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer } = window.require('electron');

export default function SearchCell({
    cellInfo,
    setCellInfo,
    productsOnShelf,
    setProductOnShelf,
    setSearchingProduct,
    isAdding,
    setIsAdding,
    isAddingButton,
}) {
    const [oldestProducts, setOldestProducts] = useState({});
    const [youngestProducts, setYoungestProducts] = useState({});

    useEffect(() => {
        const oldest = {};
        const youngest = {};

        // Grupowanie produktów według indeksów
        productsOnShelf.forEach((product) => {
            const index = product.Nr;
            const date = new Date(product.Date);

            if (!oldest[index] || date < new Date(oldest[index].Date)) {
                oldest[index] = product;
            }

            if (!youngest[index] || date > new Date(youngest[index].Date)) {
                youngest[index] = product;
            }
        });

        // Sprawdzenie, czy produkty jednoindeksowe są uznawane jako najstarsze
        Object.keys(oldest).forEach((index) => {
            if (!youngest[index]) {
                youngest[index] = oldest[index];
            }
        });

        // Ustawienie pojedynczych produktów jako najstarszych, jeśli są jedynym produktem danego indeksu
        Object.keys(oldest).forEach((index) => {
            if (!youngest[index] && productsOnShelf.some((p) => p.Nr === index)) {
                youngest[index] = oldest[index];
            }
        });

        setOldestProducts(oldest);
        setYoungestProducts(youngest);
    }, [productsOnShelf]);

    // Usunięcie produktu z półki
    const removeProductFromShelf = async (product) => {
        try {
            await ipcRenderer.invoke('RemoveProductFromShelf', product);
            // Aktualizacja listy produktów po usunięciu
            setProductOnShelf(productsOnShelf.filter((p) => p !== product));
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
    };

    const handleClickingAdd = async () => {
        setIsAdding(true);
        setProductOnShelf('');
    };

    return (
        <div className={`${styles.search_container}`}>
            <div className={styles.products_on_shelf_container}>
                {Object.keys(productsOnShelf).map((index) => {
                    const product = productsOnShelf[index];
                    const oldestProduct = oldestProducts[product.Nr];
                    const youngestProduct = youngestProducts[product.Nr];

                    const date = new Date(product.Date);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

                    return (
                        <div className={styles.product_container} key={index}>
                            <div className={styles.idk}>
                                <div className={styles.product_info_container}>
                                    <div className={styles.product_name_info_container}>
                                        <p className={styles.product_name_info}>
                                            <FontAwesomeIcon icon={faHashtag} className={`${styles.icon}`} /> Indeks
                                            produktu
                                            <br />
                                            <span className={styles.product_name_info_base}>{product.Nr}</span>
                                        </p>
                                        <p className={styles.product_name_info}>
                                            <FontAwesomeIcon icon={faQrcode} className={`${styles.icon}`} /> Kod EAN13
                                            <br />
                                            <span className={styles.product_name_info_base}>
                                                {product['Kod kreskowy jedn. podstaw.']
                                                    ? product['Kod kreskowy jedn. podstaw.']
                                                    : 'Brak'}
                                            </span>
                                        </p>
                                    </div>
                                    <div className={styles.product_description_container}>
                                        <span>
                                            <FontAwesomeIcon icon={faClipboard} className={`${styles.icon}`} />{' '}
                                            {product['Opis 2']}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.product_time_bar} ${
                                        youngestProduct && youngestProduct === product ? styles.youngest_product : ''
                                    } ${oldestProduct && oldestProduct === product ? styles.oldest_product : ''}`}>
                                    <FontAwesomeIcon icon={faClock} /> {formattedDate}
                                </div>
                            </div>
                            <div className={styles.product_edit_options}>
                                <div className={styles.icon_container} onClick={() => removeProductFromShelf(product)}>
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className={`${styles.delete_icon} ${styles.icon}`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {isAddingButton && (
                    <div className={styles.add_icon_container} onClick={handleClickingAdd}>
                        <FontAwesomeIcon icon={faPlus} className={`${styles.add_icon} ${styles.icon}`} />
                    </div>
                )}
            </div>
        </div>
    );
}
