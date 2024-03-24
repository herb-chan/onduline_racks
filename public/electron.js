const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('node:path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { autoUpdater } = require('electron-updater');

const uri =
    'mongodb+srv://admin:HvD&a3&!Bkdv2nD@onduline-racks.kbynhhf.mongodb.net/?retryWrites=true&w=majority&appName=onduline-racks';

const viewShortcut = 'Alt+V';
const searchShortcut = 'Alt+S';

let mainWindow;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

ipcMain.handle('fetchVersionInfo', async (event) => {
    const appVersion = app.getVersion();
    return appVersion;
});

autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('updateAvailable', info.version);
    autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.send('updateNotAvailable', info.version);
});

autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send(`updateDownloaded`);
});

autoUpdater.on('error', (info) => {
    mainWindow.webContents.send(info);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1680,
        height: 1050,
        fullscreen: true, // Set fullscreen to true
        icon: path.join(__dirname, 'favicon.ico'),
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL(`file://${__dirname}/../build/index.html`);
    // mainWindow.loadURL(`http://localhost:3000`);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    globalShortcut.register(viewShortcut, () => {
        mainWindow.webContents.send('shortcutTriggered', 'viewShortcut');
    });

    globalShortcut.register(searchShortcut, () => {
        mainWindow.webContents.send('shortcutTriggered', 'searchShortcut');
    });

    autoUpdater.checkForUpdates();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function fetchShelvesData() {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });

        const query = {};
        const result = await client.db('Onduline').collection('Rack').find(query).toArray();

        const date = new Date();
        console.log(date);

        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function searchByIndeksOnRack(productIndeks) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        // Example query: find documents with a specific index
        const query = { Nr: productIndeks };
        const result = await client.db('Onduline').collection('Rack').find(query).toArray();
        console.log(`You successfully connected to MongoDB!`);

        // Close the connection
        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function searchByEANOnRack(productEAN) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        // Example query: find documents with a specific index
        const query = { 'Kod kreskowy jedn. podstaw.': productEAN };
        const result = await client.db('Onduline').collection('Rack').find(query).toArray();
        console.log(`You successfully connected to MongoDB!`);

        // Close the connection
        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function searchByCell(cellSymbol, productIndeks) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });

        const query = { Cell: cellSymbol, Nr: productIndeks };
        const result = await client.db('Onduline').collection('Rack').find(query).toArray();

        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function searchTheCell(cellSymbol) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });

        const query = { Cell: cellSymbol };
        const result = await client.db('Onduline').collection('Rack').find(query).toArray();

        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function removeProductFromShelf(product) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        const query = {
            Nr: product['Nr'],
            Cell: product['Cell'],
            Date: product['Date'],
        };

        const result = await client.db('Onduline').collection('Rack').deleteOne(query);
        console.log(`${result.deletedCount} document(s) deleted`);
        console.log(product['Nr']);
        await client.close();
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function searchByIndeks(productIndeks) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        // Example query: find documents with a specific index
        const query = { Nr: productIndeks };
        const result = await client.db('Onduline').collection('Products').find(query).toArray();
        console.log(`You successfully connected to MongoDB!`);

        // Close the connection
        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function putProductOnShelf(validResult, cellSymbol) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });

        const product = {
            Nr: validResult[0]['Nr'],
            'Local Code': validResult[0]['Local Code'],
            'Kod raportowania': validResult[0]['Kod raportowania'],
            Opis: validResult[0]['Opis'],
            Zablokowane: validResult[0]['Zablokowane'],
            'Opis 2': validResult[0]['Opis 2'],
            Zapasy: validResult[0]['Zapasy'],
            'Istnieją substytuty': validResult[0]['Istnieją substytuty'],
            'BOM kompletacji': validResult[0]['BOM kompletacji'],
            'Podst. jednostka miary': validResult[0]['Podst. jednostka miary'],
            'Koszt jest skorygowany': validResult[0]['Koszt jest skorygowany'],
            'Koszt jednostkowy (zaokr.)': validResult[0]['Koszt jednostkowy (zaokr.)'],
            'Cena jednostkowa': validResult[0]['Cena jednostkowa'],
            'Opis szukany': validResult[0]['Opis szukany'],
            'QSM Code': validResult[0]['QSM Code'],
            'Sprzedaż (ilość)': validResult[0]['Sprzedaż (ilość)'],
            'Domyślny kod lokalizacji': validResult[0]['Domyślny kod lokalizacji'],
            'Ilość na zamówieniu sprzedaży': validResult[0]['Ilość na zamówieniu sprzedaży'],
            'Ilość na zleceniu prod.': validResult[0]['Ilość na zleceniu prod.'],
            'Ilość w wierszach komponentu': validResult[0]['Ilość w wierszach komponentu'],
            'Waga netto': validResult[0]['Waga netto'],
            'Waga brutto': validResult[0]['Waga brutto'],
            Wycofany: validResult[0]['Wycofany'],
            'Towar niebezpieczny': validResult[0]['Towar niebezpieczny'],
            Cell: cellSymbol,
            Date: new Date(),
        };

        // Insert the new record into the Rack collection
        const result = await client.db('Onduline').collection('Rack').insertOne(product);

        await client.close();

        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

ipcMain.handle('fetchShelvesData', async (event) => {
    return await fetchShelvesData();
});

ipcMain.handle('searchByIndeksOnRack', async (event, productIndeks) => {
    return await searchByIndeksOnRack(productIndeks);
});

ipcMain.handle('searchByEANOnRack', async (event, productEAN) => {
    return await searchByEANOnRack(productEAN);
});

ipcMain.handle('searchByCell', async (event, cellSymbol, productIndeks) => {
    return await searchByCell(cellSymbol, productIndeks);
});

ipcMain.handle('searchTheCell', async (event, cellSymbol) => {
    return await searchTheCell(cellSymbol);
});

ipcMain.handle('RemoveProductFromShelf', async (event, product) => {
    return await removeProductFromShelf(product);
});

ipcMain.handle('searchByIndeks', async (event, productIndeks) => {
    return await searchByIndeks(productIndeks);
});

ipcMain.handle('putProductOnShelf', async (event, validResult, cellSymbol) => {
    return await putProductOnShelf(validResult, cellSymbol);
});
