import styles from './topbar.module.css';

export default function TopBar({ activeButton }) {
    const getActionName = () => {
        let actionName;

        if (activeButton === 'Wyświetl') {
            actionName = `wyświetlasz`;
        } else if (activeButton === 'Wyszukaj') {
            actionName = 'wyszukujesz';
        }

        return actionName;
    };

    const getActionClassName = () => {
        let className;

        if (activeButton === 'Wyświetl') {
            className = `${styles.wyświetl}`;
        } else if (activeButton === 'Wyszukaj') {
            className = `${styles.wyszukaj}`;
        }

        return className;
    };

    return (
        <div className={`${styles.topbar_container}`}>
            <h1>
                Aktualnie <span className={getActionClassName()}>{getActionName()}</span> produkty
            </h1>
        </div>
    );
}
