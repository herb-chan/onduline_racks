import styles from './logo.module.css';
import racksLogo from './racks_logo.png';
import ondulineLogo from './onduline_logo.png';

export default function Logo() {
    return (
        <div className={`${styles.logo_container}`}>
            <img src={racksLogo} alt="application logo" className={styles.racks_logo} />
            <img src={ondulineLogo} alt="application logo" className={styles.onduline_logo} />
        </div>
    );
}
