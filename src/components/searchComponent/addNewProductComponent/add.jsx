import styles from './add.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTag,
    faBarcode,
    faCheck,
    faCircleXmark,
    faCircleExclamation,
    faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
const { ipcRenderer } = window.require('electron');

export default function AddProduct({
    productToAdd,
    setProductToAdd,
    communicate,
    setCommunicate,
    cellInfo,
    setIsAdding,
    setProductOnShelf,
}) {
    const [validResult, setValidResult] = useState('');
    const [addResult, setAddResult] = useState('');

    const productToAddInputChange = async (e) => {
        setProductToAdd(e.target.value.toUpperCase());
        setCommunicate('');
        setValidResult('');
    };

    const handleAdding = async () => {
        if (productToAdd !== '') {
            try {
                const result = await ipcRenderer.invoke('searchByIndeks', productToAdd);
                console.log('Search result:', result);
                console.log('Searching for:', productToAdd);

                if (result.length > 0) {
                    setValidResult(result);
                } else {
                    setCommunicate(
                        <>
                            <FontAwesomeIcon icon={faCircleXmark} />{' '}
                            {`Produkt '${productToAdd}' nie znajduje się w bazie produktów.`}
                        </>
                    );
                    setAddResult('mistake');
                }
            } catch (error) {
                console.error('Error searching by index:', error);
                setCommunicate(
                    <>
                        <FontAwesomeIcon icon={faCircleExclamation} /> {'Wystąpił błąd podczas weryfikacji.'}
                    </>
                );
                setAddResult('error');
            }
        } else if (productToAdd === '') {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faCircleXmark} /> {'Nie wprowadzono produktu, który ma zostać dodany.'}
                </>
            );
            setAddResult('mistake');
        } else {
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faClockRotateLeft} />{' '}
                    {`Zweryfikowanie produktu '${productToAdd}' może zająć krótką chwilę...`}
                </>
            );
            setAddResult('mistake');
        }
    };

    const confirmAddingProduct = async () => {
        try {
            await ipcRenderer.invoke('putProductOnShelf', validResult, cellInfo);
            await setIsAdding(false);
            await setProductToAdd('');
            const result = await ipcRenderer.invoke('searchTheCell', cellInfo);
            if (result.length > 0) {
                setProductOnShelf(result);
            }
        } catch (error) {
            console.error('Error adding product to shelf:', error);
            setCommunicate(
                <>
                    <FontAwesomeIcon icon={faCircleExclamation} /> {'Wystąpił błąd podczas dodawania produktu.'}
                </>
            );
            setAddResult('error');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdding();
        }
    };

    const getCommunicateClassName = () => {
        let className;
        switch (addResult) {
            case 'mistake':
                className = `${styles.mistake} ${styles.communicate}`;
                break;
            default:
                className = `${styles.error} ${styles.communicate}`;
                break;
        }
        return className;
    };

    return (
        <div className={styles.display_container}>
            <div className={`${styles.add_container}`}>
                <h1>Dodaj produkt:</h1>
                <div className={`${styles.search_bar_container}`}>
                    <div
                        className={`${styles.icon_container} ${productToAdd !== '' ? styles.icon_active : ''}`}
                        onClick={handleAdding}>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className={productToAdd !== '' ? styles.icon_shake : styles.icon}
                        />
                    </div>
                    <input
                        className={styles.search_bar}
                        type="text"
                        placeholder="Indeks..."
                        value={productToAdd}
                        onChange={productToAddInputChange}
                        minLength={0}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <h3 className={getCommunicateClassName()}>{communicate}</h3>
                {validResult ? (
                    <div className={styles.container}>
                        <div className={styles.product_info_container}>
                            <div className={styles.product_name_info_container}>
                                <p className={styles.product_name_info}>
                                    <FontAwesomeIcon icon={faTag} className={`${styles.icon}`} /> Indeks produktu
                                    <br />
                                    <span className={styles.product_name_info_base}>{validResult[0]['Nr']}</span>
                                </p>
                                <p className={styles.product_name_info}>
                                    <FontAwesomeIcon icon={faBarcode} className={`${styles.icon}`} /> Kod EAN13
                                    <br />
                                    <span className={styles.product_name_info_base}>
                                        {validResult[0]['Kod kreskowy jedn. podstaw.']
                                            ? validResult[0]['Kod kreskowy jedn. podstaw.']
                                            : 'Brak'}
                                    </span>
                                </p>
                            </div>
                            <div className={styles.product_description_container}>
                                <span>{validResult[0]['Opis 2']}</span>
                            </div>
                        </div>
                        <div className={styles.product_edit_options}>
                            <div className={styles.icon_container_add} onClick={confirmAddingProduct}>
                                <FontAwesomeIcon icon={faCheck} className={`${styles.add_icon} ${styles.icon}`} />
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
