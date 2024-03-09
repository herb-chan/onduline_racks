import styles from './options.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Options({
    activeButton,
    setActiveButton,
    setCommunicate,
    setProductIndeks,
    setProductNR,
    setProductEAN,
    setSearchingProduct,
    setCellInfo,
}) {
    const onButtonClick = (buttonTitle) => {
        setActiveButton(buttonTitle);
        setCommunicate('');
        setProductIndeks('');
        setProductNR('');
        setProductEAN('');
        setSearchingProduct('');
        setCellInfo('');
    };

    const getWyświetlIndicatorClassName = () => {
        return activeButton === 'Wyświetl' ? styles.wyświetl_indicator_active : styles.indicator_inactive;
    };

    const getWyszukajIndicatorClassName = () => {
        return activeButton === 'Wyszukaj' ? styles.wyszukaj_indicator_active : styles.indicator_inactive;
    };

    const getWyświetlClassName = () => {
        return activeButton === 'Wyświetl' ? styles.wyświetl_active : styles.text_inactive;
    };

    const getWyszukajClassName = () => {
        return activeButton === 'Wyszukaj' ? styles.wyszukaj_active : styles.text_inactive;
    };

    const getHoverable = (buttonTitle) => {
        return activeButton !== buttonTitle
            ? `${styles.button_container} ${styles.hoverable}`
            : styles.button_container;
    };

    return (
        <div className={`${styles.options_container}`}>
            <div
                className={`${styles.button_container} ${getHoverable('Wyświetl')}`}
                onClick={() => onButtonClick('Wyświetl')}>
                <div className={`${styles.select_indicator} ${getWyświetlIndicatorClassName()}`}></div>
                <div className={`${styles.options_button} ${getWyświetlClassName()}`}>
                    <FontAwesomeIcon icon={faBox} className={styles.icon} />
                    Wyświetl
                </div>
                <div></div>
            </div>
            <div
                className={`${styles.button_container} ${getHoverable('Wyszukaj')}`}
                onClick={() => onButtonClick('Wyszukaj')}>
                <div className={`${styles.select_indicator} ${getWyszukajIndicatorClassName()}`}></div>
                <div className={`${styles.options_button} ${getWyszukajClassName()}`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
                    Wyszukaj
                </div>
                <div></div>
            </div>
        </div>
    );
}
