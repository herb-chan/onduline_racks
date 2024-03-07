import React, { useState, useEffect } from 'react';
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

    // Handle changes in productsOnShelf array
    useEffect(() => {
        // If there are no products on shelf, reset the cellInfo state and searchingProduct state
        if (productsOnShelf.length === 0 && cellInfo) {
            setCellInfo('');
            setSearchingProduct(''); // Reset to empty array to trigger re-fetch of data in SearchResult
        }
    }, [productsOnShelf, cellInfo, setCellInfo, setSearchingProduct]);

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
                    productsOnShelf={productsOnShelf}
                    setProductOnShelf={setProductOnShelf}
                />
            ) : null}
            {cellInfo && productsOnShelf ? (
                <SearchCell
                    cellInfo={cellInfo}
                    setCellInfo={setCellInfo}
                    productsOnShelf={productsOnShelf}
                    setProductOnShelf={setProductOnShelf}
                    setSearchingProduct={setSearchingProduct}
                />
            ) : null}
        </>
    );
}
