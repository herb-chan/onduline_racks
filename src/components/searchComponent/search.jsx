import React, { useState } from 'react';
import styles from './search.module.css';
import SearchBar from './searchBarComponent/searchbar';
import SearchResult from './searchResultComponent/searchresult';

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

    return (
        <>
            {searchingProduct === '' ? (
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
            ) : (
                <SearchResult searchingProduct={searchingProduct} />
            )}
        </>
    );
}
