import styles from './searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer } = window.require('electron');

export default function SearchBar({
    productIndeks,
    setProductIndeks,
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
    setIsAddingButton,
    setIsAdding,
}) {
    const handleIndeksInputChange = (e) => {
        setProductIndeks(e.target.value.toUpperCase());
        setSearchResult('');
        setCommunicate('');
        setIsAddingButton(false);
        setIsAdding(false);
    };

    const handleEANInputChange = (e) => {
        setProductEAN(e.target.value);
        setSearchResult('');
        setCommunicate('');
        setIsAddingButton(false);
        setIsAdding(false);
    };

    const handleSelectSearchMethodChange = (e) => {
        setSelectedSearchMethod(e.target.value);
        setCommunicate('');
        setProductIndeks('');
        setProductEAN('');
        setSearchResult('');
    };

    const handleSearchingIndeks = async () => {
        if (selectedSearchMethod === 'indeks' && productIndeks !== '') {
            setIsAdding(false);
            setIsAddingButton(false);
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
        } else if (selectedSearchMethod === 'indeks' && productIndeks === '') {
            setCommunicate('Błąd: Nie wprowadzono produktu, który ma zostać wyszukany.');
        } else if (selectedSearchMethod === 'indeks' && productIndeks.length !== 8) {
            setCommunicate(`Błąd: Wprowadzony kod INDEKS jest krótszy niż wymagane 8 znaków.`);
            setSearchResult('search_is_too_short');
        } else {
            setCommunicate(`Wyszukiwanie produktu "${productIndeks}" może zająć krótką chwilę...`);
        }
    };

    const handleSearchingEAN = async () => {
        if (selectedSearchMethod === 'ean' && productEAN !== '' && searchResult === '' && productEAN.length === 13) {
            setIsAdding(false);
            setIsAddingButton(false);
            try {
                const result = await ipcRenderer.invoke('searchByEANOnRack', productEAN);
                console.log('Search result:', result);
                console.log('Searching for:', productEAN);

                if (result.length > 0) {
                    const productList = result.map((item) => item);
                    console.log('Product list:', productList);
                    setSearchingProduct(productList);
                } else {
                    // No product found in the database
                    setCommunicate(`Błąd: Produkt "${productEAN}" nie został znaleziony w bazie.`);
                    setSearchResult('no_product_in_database');
                }
            } catch (error) {
                console.error('Error searching by EAN:', error);
                setCommunicate('Błąd: Wystąpił błąd podczas wyszukiwania.');
            }
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

    const handleIndeksKeyPress = async (e) => {
        if (e.key === 'Enter') {
            handleSearchingIndeks();
        }
    };

    const handleEANKeyPress = async (e) => {
        if (e.key === 'Enter') {
            handleSearchingEAN();
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
                        minLength={0}
                        onKeyDown={handleIndeksKeyPress} // Obsługa naciśnięcia klawisza Enter
                    />
                    <select
                        className={`${styles.selected_search_option}`}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}>
                        <option value={'indeks'}>Indeks</option>
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
                        onKeyDown={handleEANKeyPress} // Obsługa naciśnięcia klawisza Enter
                    />
                    <select
                        className={`${styles.selected_search_option}`}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}>
                        <option value={'indeks'}>Indeks</option>
                        <option value={'ean'}>EAN13</option>
                    </select>
                </div>
                <h3 className={`${styles.error_searching}`}>{communicate}</h3>
            </div>
        </div>
    );
}
