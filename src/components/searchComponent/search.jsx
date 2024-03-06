import React, { useState } from 'react';
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
    cellInfo,
    setCellInfo,
    productsOnShelf,
    setProductOnShelf,
}) {
    const [selectedSearchMethod, setSelectedSearchMethod] = useState('indeks');

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
                <SearchResult
                    searchingProduct={searchingProduct}
                    setCellInfo={setCellInfo}
                    setProductOnShelf={setProductOnShelf}
                />
            ) : null}
            {cellInfo && productsOnShelf ? <SearchCell cellInfo={cellInfo} productsOnShelf={productsOnShelf} /> : null}
        </>
    );
}
