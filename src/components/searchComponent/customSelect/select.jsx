import React, { useState } from 'react';
import styles from './select.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function CustomSelect({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`${styles.custom_select} ${isOpen ? styles.open : ''}`} onClick={handleToggle}>
            <div
                className={
                    isOpen ? `${styles.selected_option} ${styles.selected_option_open}` : styles.selected_option
                }>
                {value} <FontAwesomeIcon icon={faCaretRight} className={isOpen ? styles.icon_opened : styles.icon} />
            </div>
            {isOpen && (
                <div className={styles.option_list}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={value === option.value ? styles.option_selected : styles.option}
                            onClick={() => handleSelectOption(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
