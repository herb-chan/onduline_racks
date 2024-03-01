import styles from './options.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faBox } from '@fortawesome/free-solid-svg-icons';

export default function Options({ activeButton, setActiveButton }) {
    const onButtonClick = (buttonTitle) => {
        setActiveButton(buttonTitle);
    };

    const getWyświetlIndicatorClassName = () => {
        return activeButton === 'Wyświetl' ? styles.wyświetl_indicator_active : styles.indicator_inactive;
    };

    const getWprowadźIndicatorClassName = () => {
        return activeButton === 'Wprowadź' ? styles.wprowadź_indicator_active : styles.indicator_inactive;
    };

    const getUsuńIndicatorClassName = () => {
        return activeButton === 'Usuń' ? styles.usuń_indicator_active : styles.indicator_inactive;
    };

    const getWyświetlClassName = () => {
        return activeButton === 'Wyświetl' ? styles.wyświetl_active : styles.text_inactive;
    };

    const getWprowadźClassName = () => {
        return activeButton === 'Wprowadź' ? styles.wprowadź_active : styles.text_inactive;
    };

    const getUsuńClassName = () => {
        return activeButton === 'Usuń' ? styles.usuń_active : styles.text_inactive;
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
                className={`${styles.button_container} ${getHoverable('Wprowadź')}`}
                onClick={() => onButtonClick('Wprowadź')}>
                <div className={`${styles.select_indicator} ${getWprowadźIndicatorClassName()}`}></div>
                <div className={`${styles.options_button} ${getWprowadźClassName()}`}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                    Wprowadź
                </div>
                <div></div>
            </div>
            <div className={`${styles.button_container} ${getHoverable('Usuń')}`} onClick={() => onButtonClick('Usuń')}>
                <div className={`${styles.select_indicator} ${getUsuńIndicatorClassName()}`}></div>
                <div className={`${styles.options_button} ${getUsuńClassName()}`}>
                    <FontAwesomeIcon icon={faTrash} className={styles.icon} />
                    Usuń
                </div>
                <div></div>
            </div>
        </div>
    );
}
