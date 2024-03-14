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
    // Initialize variables to store the oldest and youngest product
    let oldestProduct = null;
    let youngestProduct = null;

    // Iterate through products to find the oldest and youngest
    productsOnShelf.forEach((product) => {
        const productDate = new Date(product.Date);

        // Check if oldestProduct is null or if the current product is older than the stored oldest product
        if (oldestProduct === null || productDate < new Date(oldestProduct.Date)) {
            oldestProduct = product;
        }

        // Check if youngestProduct is null or if the current product is younger than the stored youngest product
        if (youngestProduct === null || productDate > new Date(youngestProduct.Date)) {
            youngestProduct = product;
        }
    });

    const removeProductFromShelf = async (product) => {
        try {
            await ipcRenderer.invoke('RemoveProductFromShelf', product);
            // Update the list of products after deletion
            setProductOnShelf(productsOnShelf.filter((p) => p !== product));
            console.log(product);
            if (productsOnShelf.length === 0) {
                const result = await ipcRenderer.invoke('searchByIndeksOnRack', product['Nr']);
                console.log('Search result:', result);
                console.log('Indeks:', product['Nr']);
                console.log('EAN13:', product['Kod kreskowy jedn. podstaw.']);
                console.log('Description:', product['Opis 2']);
                console.log('Cell:', product['Cell']);
                console.log('Date:', product['Date']);

                if (result.length > 0) {
                    const productList = result.map((item) => item);
                    console.log('New product list:', productList);
                    setSearchingProduct(productList);
                    setProductOnShelf('');
                    setCellInfo('');
                }
            }
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    const handleClickingAdd = async () => {
        setIsAdding(true);
        setProductOnShelf('');
        console.log(cellInfo);
    };

    return (
        <div className={`${styles.search_container}`}>
            <div className={styles.products_on_shelf_container}>
                {productsOnShelf.map((product, index) => {
                    // Convert the date string to a Date object
                    const date = new Date(product.Date);
                    // Format the date to display only day, month, and year
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    // Determine if the current product is the youngest or oldest
                    const isOldest = oldestProduct && product === oldestProduct;
                    const isYoungest = youngestProduct && product === youngestProduct;

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
                                    className={`${styles.product_time_bar} ${isOldest ? styles.oldest_product : ''} ${
                                        isYoungest ? styles.youngest_product : ''
                                    }`}>
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
                {isAddingButton ? (
                    <div className={styles.add_icon_container} onClick={handleClickingAdd}>
                        <FontAwesomeIcon icon={faPlus} className={`${styles.add_icon} ${styles.icon}`} />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
