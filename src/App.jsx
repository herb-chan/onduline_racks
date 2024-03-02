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
    const [searchResult, setSearchResult] = useState('no_product_in_database');

    return (
        <div className="App">
            <SideBar activeButton={activeButton} setActiveButton={setActiveButton} />
            <div className="top_action">
                <TopBar activeButton={activeButton} />
                {activeButton === 'Wyświetl' ? (
                    <ViewAction />
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
                    />
                )}
            </div>
        </div>
    );
}

export default App;
