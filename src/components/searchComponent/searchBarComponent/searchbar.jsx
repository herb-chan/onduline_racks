import styles from './searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCircleExclamation,
    faCircleXmark,
    faTag,
    faBarcode,
    faClockRotateLeft,
    faRuler,
} from '@fortawesome/free-solid-svg-icons';
import CustomSelect from '../customSelect/select';
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
    const handleIndeksInputChange = async (e) => {
        setProductIndeks(e.target.value.toUpperCase());
        setSearchResult('');
        setCommunicate('');
        setIsAddingButton(false);
        setIsAdding(false);
    };

    const handleEANInputChange = async (e) => {
        setProductEAN(e.target.value.toUpperCase());
        setSearchResult('');
        setCommunicate('');
        setIsAddingButton(false);
        setIsAdding(false);
    };

    const handleSelectSearchMethodChange = async (e) => {
        setSelectedSearchMethod(e);
        setCommunicate('');
        setProductIndeks('');
        setProductEAN('');
        setSearchResult('');
    };

    const getCommunicateClassName = () => {
        let className;
        switch (searchResult) {
            case 'mistake':
                className = `${styles.mistake} ${styles.communicate}`;
                break;
            default:
                className = `${styles.error} ${styles.communicate}`;
                break;
        }
        return className;
    };

    const handleSearchingIndeks = async () => {
        if (selectedSearchMethod === 'Indeks' && productIndeks !== '') {
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
                    setCommunicate(
                        <>
                            <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />{' '}
                            {`Produkt '${productIndeks}' nie znajduje się na regale wysokiego składowania.`}
                        </>
                    );
                    setSearchResult('mistake');
                }
            } catch (error) {
                console.error('Error searching by index:', error);
                setCommunicate(
                    <>
                        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />{' '}
                        {'Wystąpił błąd podczas wyszukiwania.'}
                    </>
                );
                setSearchResult('error');
            }
        } else if (selectedSearchMethod === 'Indeks' && productIndeks === '') {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />{' '}
                    {'Nie wprowadzono produktu, który ma zostać wyszukany.'}
                </>
            );
            setSearchResult('mistake');
        } else {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faClockRotateLeft} className={styles.icon} />{' '}
                    {`Odnalezienie produktu '${productIndeks}' może zająć krótką chwilę...`}
                </>
            );
            setSearchResult('mistake');
        }
    };

    const handleSearchingEAN = async () => {
        if (selectedSearchMethod === 'EAN13' && productEAN !== '' && searchResult === '' && productEAN.length === 13) {
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
                    setCommunicate(
                        <>
                            <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />{' '}
                            {`Produkt '${productEAN}' nie znajduje się na regale wysokiego składowania.`}
                        </>
                    );
                    setSearchResult('mistake');
                }
            } catch (error) {
                console.error('Error searching by EAN13:', error);
                setCommunicate(
                    <>
                        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />{' '}
                        {'Wystąpił błąd podczas wyszukiwania.'}
                    </>
                );
                setSearchResult('error');
            }
        } else if (selectedSearchMethod === 'EAN13' && productEAN === '') {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />{' '}
                    {'Nie wprowadzono produktu, który ma zostać wyszukany.'}
                </>
            );
            setSearchResult('mistake');
        } else if (selectedSearchMethod === 'EAN13' && productEAN !== '' && productEAN.length !== 13) {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faRuler} className={styles.icon} />{' '}
                    {'Wprowadzony kod EAN13 jest krótszy niż wymagane 13 znaków.'}
                </>
            );
            setSearchResult('mistake');
        } else {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />{' '}
                    {'Wystąpił błąd podczas wyszukiwania.'}
                </>
            );
            setSearchResult('error');
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
                    selectedSearchMethod === 'Indeks' ? styles.display_indeks : ''
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
                    <CustomSelect
                        options={[
                            {
                                label: (
                                    <span>
                                        <FontAwesomeIcon icon={faTag} className={styles.icon} /> Indeks
                                    </span>
                                ),
                                value: 'Indeks',
                            },
                            {
                                label: (
                                    <span>
                                        <FontAwesomeIcon icon={faBarcode} className={styles.icon} /> EAN13
                                    </span>
                                ),
                                value: 'EAN13',
                            },
                        ]}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}
                    />
                </div>
                <h3 className={getCommunicateClassName()}>{communicate}</h3>
            </div>
            <div
                className={`${styles.display_container} ${selectedSearchMethod === 'EAN13' ? styles.display_ean : ''}`}>
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
                    <CustomSelect
                        options={[
                            {
                                label: (
                                    <span>
                                        <FontAwesomeIcon icon={faTag} className={styles.icon} /> Indeks
                                    </span>
                                ),
                                value: 'Indeks',
                            },
                            {
                                label: (
                                    <span>
                                        <FontAwesomeIcon icon={faBarcode} className={styles.icon} /> EAN13
                                    </span>
                                ),
                                value: 'EAN13',
                            },
                        ]}
                        value={selectedSearchMethod}
                        onChange={handleSelectSearchMethodChange}
                    />
                </div>
                <h3 className={getCommunicateClassName()}>{communicate}</h3>
            </div>
        </div>
    );
}
