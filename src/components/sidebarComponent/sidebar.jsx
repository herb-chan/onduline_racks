import styles from './sidebar.module.css';
import Logo from '../logoComponent/logo';
import Options from '../optionsComponent/options';

export default function SideBar({ activeButton, setActiveButton }) {
    return (
        <div className={`${styles.sidebar_container}`}>
            <Logo />
            <Options activeButton={activeButton} setActiveButton={setActiveButton} />
        </div>
    );
}
