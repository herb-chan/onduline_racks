import styles from './sidebar.module.css';
import Logo from '../logoComponent/logo';
import Options from '../optionsComponent/options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

export default function SideBar({
    activeButton,
    setActiveButton,
    setCommunicate,
    setProductIndeks,
    setProductNR,
    setProductEAN,
    setSearchingProduct,
    setCellInfo,
    setProductToAdd,
}) {
    const [version, setVersion] = useState('');
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateNotAvailable, setUpdateNotAvailable] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);

    useEffect(() => {
        fetchVersionInfo();
        ipcRenderer.on('updateAvailable', (event, version) => {
            setUpdateAvailable(true);
        });

        ipcRenderer.on('updateNotAvailable', (event, version) => {
            setUpdateNotAvailable(true);
        });

        ipcRenderer.on('updateDownloaded', (event) => {
            setUpdateDownloaded(true);
            setUpdateAvailable(false);
        });

        return () => {
            ipcRenderer.removeAllListeners('updateAvailable');
            ipcRenderer.removeAllListeners('updateNotAvailable');
            ipcRenderer.removeAllListeners('updateDownloaded');
        };
    }, []);

    const fetchVersionInfo = async () => {
        try {
            const versionInfo = await ipcRenderer.invoke('fetchVersionInfo');
            setVersion(versionInfo);
        } catch (error) {
            console.error('Error fetching version info:', error);
        }
    };

    return (
        <div className={`${styles.sidebar_container}`}>
            <Logo />
            <div className={styles.sidebar_add}>
                <Options
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    setCommunicate={setCommunicate}
                    setProductIndeks={setProductIndeks}
                    setProductNR={setProductNR}
                    setProductEAN={setProductEAN}
                    setSearchingProduct={setSearchingProduct}
                    setCellInfo={setCellInfo}
                    setProductToAdd={setProductToAdd}
                />
                <span className={styles.version_info}>
                    Wersja kompilacji: {version}{' '}
                    {updateAvailable && <FontAwesomeIcon icon={faCircleNotch} className={`${styles.available_icon}`} />}
                    {updateNotAvailable && <FontAwesomeIcon icon={faCheck} className={`${styles.not_icon}`} />}
                    {updateDownloaded && (
                        <FontAwesomeIcon icon={faExclamation} className={`${styles.downloaded_icon}`} />
                    )}
                </span>
            </div>
        </div>
    );
}
