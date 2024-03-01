import React, { useState } from 'react';
import SideBar from './components/sidebarComponent/sidebar';
import TopBar from './components/topbarComponent/topbar';
import ViewAction from './components/viewComponent/view';
import './App.css';

function App() {
    const [activeButton, setActiveButton] = useState('Wyświetl');

    return (
        <div className="App">
            <SideBar activeButton={activeButton} setActiveButton={setActiveButton} />
            <div className="top_action">
                <TopBar activeButton={activeButton} />
                <ViewAction />
            </div>
        </div>
    );
}

export default App;
