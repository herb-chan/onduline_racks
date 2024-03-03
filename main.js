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

// Connect to MongoDB and perform search
async function searchByIndeks(productIndeks) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        // Example query: find documents with a specific index
        const query = { indeks: productIndeks };
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

async function searchByIndeksOnRack(productIndeks) {
    try {
        await client.connect();
        await client.db('Onduline').command({ ping: 1 });
        // Example query: find documents with a specific index
        const query = { indeks: productIndeks };
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

ipcMain.handle('searchByIndeks', async (event, productIndeks) => {
    return await searchByIndeks(productIndeks);
});

ipcMain.handle('searchByIndeksOnRack', async (event, productIndeks) => {
    return await searchByIndeksOnRack(productIndeks);
});
