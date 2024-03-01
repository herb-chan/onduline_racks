import styles from './logo.module.css';
import logo from './racks_logo.png';

export default function Logo() {
    return (
        <div className={`${styles.logo_container}`}>
            <img src={logo} alt="application logo" />
            <h1>Onduline</h1>
        </div>
    );
}
