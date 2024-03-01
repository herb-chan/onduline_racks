import styles from './view.module.css';

export default function ViewAction() {
    return (
        <div className={`${styles.view_container}`}>
            <table className={styles.rack}>
                <tr>
                    <td className={`${styles.cell}`}>A5</td>
                    <td className={`${styles.cell}`}>B5</td>
                    <td className={`${styles.cell}`}>C5</td>
                    <td className={`${styles.cell}`}>D5</td>
                    <td className={`${styles.cell}`}>E5</td>
                    <td className={`${styles.cell}`}>F5</td>
                    <td className={`${styles.cell}`}>G5</td>
                    <td className={`${styles.cell}`}>H5</td>
                    <td className={`${styles.cell}`}>I5</td>
                    <td className={`${styles.cell}`}>J5</td>
                    <td className={`${styles.cell}`}>K5</td>
                    <td className={`${styles.cell}`}>L5</td>
                    <td className={`${styles.cell}`}>Ł5</td>
                    <td className={`${styles.cell}`}>M5</td>
                </tr>
                <tr>
                    <td className={`${styles.cell}`}>A4</td>
                    <td className={`${styles.cell}`}>B4</td>
                    <td className={`${styles.cell}`}>C4</td>
                    <td className={`${styles.cell}`}>D4</td>
                    <td className={`${styles.cell}`}>E4</td>
                    <td className={`${styles.cell}`}>F4</td>
                    <td className={`${styles.cell}`}>G4</td>
                    <td className={`${styles.cell}`}>H4</td>
                    <td className={`${styles.cell}`}>I4</td>
                    <td className={`${styles.cell}`}>J4</td>
                    <td className={`${styles.cell}`}>K4</td>
                    <td className={`${styles.cell}`}>L4</td>
                    <td className={`${styles.cell}`}>Ł4</td>
                    <td className={`${styles.cell}`}>M4</td>
                </tr>
                <tr>
                    <td className={`${styles.cell}`}>A3</td>
                    <td className={`${styles.cell}`}>B3</td>
                    <td className={`${styles.cell}`}>C3</td>
                    <td className={`${styles.cell}`}>D3</td>
                    <td className={`${styles.cell}`}>E3</td>
                    <td className={`${styles.cell}`}>F3</td>
                    <td className={`${styles.cell}`}>G3</td>
                    <td className={`${styles.cell}`}>H3</td>
                    <td className={`${styles.cell}`}>I3</td>
                    <td className={`${styles.cell}`}>J3</td>
                    <td className={`${styles.cell}`}>K3</td>
                    <td className={`${styles.cell}`}>L3</td>
                    <td className={`${styles.cell}`}>Ł3</td>
                    <td className={`${styles.cell}`}>M3</td>
                </tr>
                <tr>
                    <td className={`${styles.cell}`}>A2</td>
                    <td className={`${styles.cell}`}>B2</td>
                    <td className={`${styles.cell}`}>C2</td>
                    <td className={`${styles.cell}`}>D2</td>
                    <td className={`${styles.cell}`}>E2</td>
                    <td className={`${styles.cell}`}>F2</td>
                    <td className={`${styles.cell}`}>G2</td>
                    <td className={`${styles.cell}`}>H2</td>
                    <td className={`${styles.cell}`}>I2</td>
                    <td className={`${styles.cell}`}>J2</td>
                    <td className={`${styles.cell}`}>K2</td>
                    <td rowSpan={2}></td>
                    <td className={`${styles.cell}`}>Ł2</td>
                    <td className={`${styles.cell}`}>M2</td>
                </tr>
                <tr>
                    <td className={`${styles.cell}`}>A1</td>
                    <td className={`${styles.cell}`}>B1</td>
                    <td className={`${styles.cell}`}>C1</td>
                    <td className={`${styles.cell}`}>D1</td>
                    <td className={`${styles.cell}`}>E1</td>
                    <td className={`${styles.cell}`}>F1</td>
                    <td className={`${styles.cell}`}>G1</td>
                    <td className={`${styles.cell}`}>H1</td>
                    <td className={`${styles.cell}`}>I1</td>
                    <td className={`${styles.cell}`}>J1</td>
                    <td className={`${styles.cell}`}>K1</td>
                    <td className={`${styles.cell}`}>Ł1</td>
                    <td className={`${styles.cell}`}>M1</td>
                </tr>
            </table>
        </div>
    );
}
