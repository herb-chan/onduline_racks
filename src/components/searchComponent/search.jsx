import React, { useState } from 'react';
import styles from './search.module.css';
import SearchBar from './searchBarComponent/searchbar';
import SearchResult from './searchResultComponent/searchresult';
import SearchCell from './searchCellComponent/searchCell';

export default function SearchAction({
    productIndeks,
    setProductIndeks,
    productNR,
    setProductNR,
    productEAN,
    setProductEAN,
    searchingProduct,
    setSearchingProduct,
    searchResult,
    setSearchResult,
    communicate,
    setCommunicate,
}) {
    const [selectedSearchMethod, setSelectedSearchMethod] = useState('indeks');
    const [cellInfo, setCellInfo] = useState('');

    return (
        <>
            {searchingProduct === '' && !cellInfo ? (
                <SearchBar
                    productIndeks={productIndeks}
                    setProductIndeks={setProductIndeks}
                    productNR={productNR}
                    setProductNR={setProductNR}
                    productEAN={productEAN}
                    setProductEAN={setProductEAN}
                    searchingProduct={searchingProduct}
                    setSearchingProduct={setSearchingProduct}
                    searchResult={searchResult}
                    setSearchResult={setSearchResult}
                    communicate={communicate}
                    setCommunicate={setCommunicate}
                    selectedSearchMethod={selectedSearchMethod}
                    setSelectedSearchMethod={setSelectedSearchMethod}
                />
            ) : null}
            {searchingProduct !== '' && !cellInfo ? (
                <SearchResult searchingProduct={searchingProduct} setCellInfo={setCellInfo} />
            ) : null}
            {cellInfo ? <SearchCell /> : null}
        </>
    );
}
