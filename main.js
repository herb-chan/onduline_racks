const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { MongoClient, ServerApiVersion } = require('mongodb');
// Define MongoDB URI
const uri =
    'mongodb+srv://admin:HvD&a3&!Bkdv2nD@onduline-racks.kbynhhf.mongodb.net/?retryWrites=true&w=majority&appName=onduline-racks';

// Create MongoDB client
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

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'favicon.ico'),
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

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
