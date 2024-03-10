import React, { useState } from 'react';
import SideBar from './components/sidebarComponent/sidebar';
import TopBar from './components/topbarComponent/topbar';
import ViewAction from './components/viewComponent/view';
import SearchAction from './components/searchComponent/search';
import './App.css';

function App() {
    const [activeButton, setActiveButton] = useState('Wyświetl');
    const [productIndeks, setProductIndeks] = useState('');
    const [productNR, setProductNR] = useState('');
    const [productEAN, setProductEAN] = useState('');
    const [searchingProduct, setSearchingProduct] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [communicate, setCommunicate] = useState('');
    const [cellInfo, setCellInfo] = useState('');
    const [productsOnShelf, setProductOnShelf] = useState('');
    const [productToAdd, setProductToAdd] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingButton, setIsAddingButton] = useState(false);

    return (
        <div className="App">
            <SideBar
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setCommunicate={setCommunicate}
                setProductIndeks={setProductIndeks}
                setProductNR={setProductNR}
                setProductEAN={setProductEAN}
                setSearchingProduct={setSearchingProduct}
                setCellInfo={setCellInfo}
            />
            <div className="top_action">
                <TopBar activeButton={activeButton} searchingProduct={searchingProduct} cellInfo={cellInfo} />
                {activeButton === 'Wyświetl' ? (
                    <ViewAction
                        setCellInfo={setCellInfo}
                        setProductOnShelf={setProductOnShelf}
                        setActiveButton={setActiveButton}
                        setIsAddingButton={setIsAddingButton}
                        setIsAdding={setIsAdding}
                    />
                ) : (
                    <SearchAction
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
                        cellInfo={cellInfo}
                        setCellInfo={setCellInfo}
                        productsOnShelf={productsOnShelf}
                        setProductOnShelf={setProductOnShelf}
                        productToAdd={productToAdd}
                        setProductToAdd={setProductToAdd}
                        isAdding={isAdding}
                        setIsAdding={setIsAdding}
                        isAddingButton={isAddingButton}
                        setIsAddingButton={setIsAddingButton}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
