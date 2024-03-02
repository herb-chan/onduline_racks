import React, { useState } from 'react';
import styles from './search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchAction({
    productIndeks,
    setProductIndeks,
    productNR,
    setProductNR,
    productEAN,
    setProductEAN,
    searchingProduct,
    setSearchingProduct,
    searchResult,
}) {
    const [selectedSearchMethod, setSelectedSearchMethod] = useState('indeks');
    const [communicate, setCommunicate] = useState('');

    const handleIndeksInputChange = (e) => {
        setProductIndeks(e.target.value);
    };

    const handleNRInputChange = (e) => {
        setProductNR(e.target.value);
    };

    const handleEANInputChange = (e) => {
        setProductEAN(e.target.value);
    };

    const handleSelectSearchMethodChange = (e) => {
        setSelectedSearchMethod(e.target.value);
        setCommunicate('');
        setProductIndeks('');
        setProductNR('');
        setProductEAN('');
    };

    const handleSearchingIndeks = () => {
        if (selectedSearchMethod === 'indeks' && productIndeks !== '' && searchResult === '') {
            setSearchingProduct(productIndeks);
        } else if (selectedSearchMethod === 'indeks' && productIndeks === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (
            selectedSearchMethod === 'indeks' &&
            productIndeks !== '' &&
            searchResult === 'no_product_in_database'
        ) {
            setCommunicate(`Błąd: Produkt "${productIndeks}" nie został znaleziony w bazie.`);
        } else if (
            selectedSearchMethod === 'indeks' &&
            productIndeks !== '' &&
            searchResult === 'no_product_on_shelves'
        ) {
            setCommunicate(`Produkt "${productIndeks}" nie znajduje się na regałach wysokiego składowania.`);
        } else {
            setCommunicate(`Błąd: nie można wyszukać produktu "${productIndeks}".`);
        }
    };

    const handleSearchingNumer = () => {
        if (selectedSearchMethod === 'numer' && productNR !== '' && searchResult === '') {
            setSearchingProduct(productNR);
        } else if (selectedSearchMethod === 'numer' && productNR === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (selectedSearchMethod === 'numer' && productNR !== '' && searchResult === 'no_product_in_database') {
            setCommunicate(`Błąd: Produkt "${productNR}" nie został znaleziony w bazie.`);
        } else if (selectedSearchMethod === 'numer' && productNR !== '' && searchResult === 'no_product_on_shelves') {
            setCommunicate(`Produkt "${productNR}" nie znajduje się na regałach wysokiego składowania.`);
        } else {
            setCommunicate(`Błąd: nie można wyszukać produktu "${productNR}".`);
        }
    };

    const handleSearchingEAN = () => {
        if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === '') {
            setSearchingProduct(productEAN);
        } else if (selectedSearchMethod === 'ean' && productEAN === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === 'no_product_in_database') {
            setCommunicate(`Błąd: Produkt "${productEAN}" nie został znaleziony w bazie.`);
        } else if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === 'no_product_on_shelves') {
            setCommunicate(`Produkt "${productEAN}" nie znajduje się na regałach wysokiego składowania.`);
        } else {
            setCommunicate(`Błąd: nie można wyszukać produktu "${productEAN}".`);
        }
    };

    return (
        <div className={`${styles.search_container}`}>
            <div
                className={`${styles.display_container} ${
                    selectedSearchMethod === 'indeks' ? styles.display_indeks : ''
                }`}>
                <h1>Wyszukiwanie za pomocą indeksu:</h1>{' '}
                <div className={`${styles.search_bar_container}`}>
                    <div
                        className={`${styles.icon_container} ${productIndeks !== '' ? styles.icon_active : ''}`}
                        onClick={handleSearchingIndeks}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={productIndeks !== '' ? styles.icon_shake : styles.icon}
                        />
                    </div>
                    <input
                        id="product_indeks_specification_field"
                        className={styles.search_bar}
                        type="text"
                        placeholder="Indeks..."
                        value={productIndeks}
                        onChange={handleIndeksInputChange}
                        maxLength={8}
                    />
                    <select
                        className={`${styles.selected_search_option}`}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}>
                        <option value={'indeks'}>Indeks</option>
                        <option value={'numer'}>Nr zapasu</option>
                        <option value={'ean'}>EAN13</option>
                    </select>
                </div>
                <h3 className={`${searchResult}`}>{communicate}</h3>
            </div>
            <div
                className={`${styles.display_container} ${
                    selectedSearchMethod === 'numer' ? styles.display_numer : ''
                }`}>
                <h1>Wyszukiwanie za pomocą numeru zapasu:</h1>{' '}
                <div className={`${styles.search_bar_container}`}>
                    <div
                        className={`${styles.icon_container} ${productNR !== '' ? styles.icon_active : ''}`}
                        onClick={handleSearchingNumer}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={productNR !== '' ? styles.icon_shake : styles.icon}
                        />
                    </div>
                    <input
                        id="product_nr_specification_field"
                        className={styles.search_bar}
                        type="text"
                        placeholder="Numer zapasu..."
                        value={productNR}
                        onChange={handleNRInputChange}
                    />
                    <select
                        className={`${styles.selected_search_option}`}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}>
                        <option value={'indeks'}>Indeks</option>
                        <option value={'numer'}>Nr zapasu</option>
                        <option value={'ean'}>EAN13</option>
                    </select>
                </div>
                <h3 className={`${searchResult}`}>{communicate}</h3>
            </div>
            <div className={`${styles.display_container} ${selectedSearchMethod === 'ean' ? styles.display_ean : ''}`}>
                <h1>Wyszukiwanie za kodu EAN13:</h1>{' '}
                <div className={`${styles.search_bar_container}`}>
                    <div
                        className={`${styles.icon_container} ${productEAN !== '' ? styles.icon_active : ''}`}
                        onClick={handleSearchingEAN}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={productEAN !== '' ? styles.icon_shake : styles.icon}
                        />
                    </div>
                    <input
                        id="product_ean_specification_field"
                        className={styles.search_bar}
                        type="text"
                        placeholder="EAN13..."
                        value={productEAN}
                        onChange={handleEANInputChange}
                        maxLength={13}
                    />
                    <select
                        className={`${styles.selected_search_option}`}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}>
                        <option value={'indeks'}>Indeks</option>
                        <option value={'numer'}>Nr zapasu</option>
                        <option value={'ean'}>EAN13</option>
                    </select>
                </div>
                <h3 className={`${searchResult}`}>{communicate}</h3>
            </div>
        </div>
    );
}
