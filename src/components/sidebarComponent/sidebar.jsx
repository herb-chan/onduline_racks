import styles from './sidebar.module.css';
import Logo from '../logoComponent/logo';
import Options from '../optionsComponent/options';

export default function SideBar({
    activeButton,
    setActiveButton,
    setCommunicate,
    setProductIndeks,
    setProductNR,
    setProductEAN,
    setSearchingProduct,
}) {
    return (
        <div className={`${styles.sidebar_container}`}>
            <Logo />
            <Options
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setCommunicate={setCommunicate}
                setProductIndeks={setProductIndeks}
                setProductNR={setProductNR}
                setProductEAN={setProductEAN}
                setSearchingProduct={setSearchingProduct}
            />
        </div>
    );
}
