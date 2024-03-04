import styles from './view.module.css';

export default function ViewAction() {
    return (
        <div className={`${styles.view_container}`}>
            <table className={styles.rack}>
                {[5, 4, 3, 2, 1].map((row) => (
                    <tr key={row}>
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Ł', 'M'].map((col) => (
                            <td key={col} className={`${styles.cell}`}>
                                <div className={styles.cell_inner}>
                                    <div className={styles.cell_symbol}>
                                        {col}
                                        {row}
                                    </div>
                                    <div className={styles.cell_info}></div>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
