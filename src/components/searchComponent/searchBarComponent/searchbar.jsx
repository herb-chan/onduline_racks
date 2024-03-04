import styles from './searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer } = window.require('electron');

export default function SearchBar({
    productIndeks,
    setProductIndeks,
    productNR,
    setProductNR,
    productEAN,
    setProductEAN,
    searchingProduct,
    setSearchingProduct,
    searchResult,
    setSearchResult,
    communicate,
    setCommunicate,
    selectedSearchMethod,
    setSelectedSearchMethod,
}) {
    const handleIndeksInputChange = (e) => {
        setProductIndeks(e.target.value);
        setSearchResult('');
        setCommunicate('');
    };

    const handleNRInputChange = (e) => {
        setProductNR(e.target.value);
        setSearchResult('');
        setCommunicate('');
    };

    const handleEANInputChange = (e) => {
        setProductEAN(e.target.value);
        setSearchResult('');
        setCommunicate('');
    };

    const handleSelectSearchMethodChange = (e) => {
        setSelectedSearchMethod(e.target.value);
        setCommunicate('');
        setProductIndeks('');
        setProductNR('');
        setProductEAN('');
        setSearchResult('');
    };

    const handleSearchingIndeks = async () => {
        if (
            selectedSearchMethod === 'indeks' &&
            productIndeks !== '' &&
            searchResult === '' &&
            productIndeks.length === 8
        ) {
            try {
                const result = await ipcRenderer.invoke('searchByIndeks', productIndeks);
                console.log('Search result:', result);
                console.log('Searching for:', productIndeks);

                if (result.length > 0) {
                    try {
                        const result = await ipcRenderer.invoke('searchByIndeksOnRack', productIndeks);
                        console.log('Search result:', result);
                        console.log('Searching for:', productIndeks);

                        if (result.length > 0) {
                            const productList = result.map((item) => item);
                            console.log('Product list:', productList);
                            setSearchingProduct(productList);
                        } else {
                            // No product found on the rack
                            setCommunicate(
                                `Błąd: Produkt "${productIndeks}" nie został znaleziony na regałach wysokiego składowania.`
                            );
                            setSearchResult('no_product_on_shelves');
                        }
                    } catch (error) {
                        console.error('Error searching by index:', error);
                        setCommunicate('Błąd: Wystąpił błąd podczas wyszukiwania.');
                    }
                } else {
                    // No product found in the database
                    setCommunicate(`Błąd: Produkt "${productIndeks}" nie został znaleziony w bazie.`);
                    setSearchResult('no_product_in_database');
                }
            } catch (error) {
                console.error('Error searching by index:', error);
                setCommunicate('Błąd: Wystąpił błąd podczas wyszukiwania.');
            }
        } else if (selectedSearchMethod === 'indeks' && productIndeks === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (selectedSearchMethod === 'indeks' && productIndeks !== '' && productIndeks.length !== 8) {
            setCommunicate(`Błąd: Wprowadzony kod INDEKS jest krótszy niż wymagane 8 znaków.`);
            setSearchResult('search_is_too_short');
        } else {
            setCommunicate(`Błąd: Nie można wyszukać produktu "${productIndeks}".`);
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
        if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === '' && productEAN.length === 13) {
            setSearchingProduct(productEAN);
        } else if (selectedSearchMethod === 'ean' && productEAN === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === 'no_product_in_database') {
            setCommunicate(`Błąd: Produkt "${productEAN}" nie został znaleziony w bazie.`);
        } else if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === 'no_product_on_shelves') {
            setCommunicate(`Produkt "${productEAN}" nie znajduje się na regałach wysokiego składowania.`);
        } else if (selectedSearchMethod === 'ean' && productEAN !== '' && productEAN.length !== 13) {
            setCommunicate(`Błąd: Wprowadzony kod EAN jest krótszy niż wymagane 13 znaków.`);
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
                        minLength={8}
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
                <h3 className={`${styles.error_searching}`}>{communicate}</h3>
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
                <h3 className={`${styles.error_searching}`}>{communicate}</h3>
            </div>
            <div className={`${styles.display_container} ${selectedSearchMethod === 'ean' ? styles.display_ean : ''}`}>
                <h1>Wyszukiwanie za pomocą kodu EAN13:</h1>{' '}
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
                        minLength={13}
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
                <h3 className={`${styles.error_searching}`}>{communicate}</h3>
            </div>
        </div>
    );
}
