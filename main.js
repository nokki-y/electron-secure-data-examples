const { app, BrowserWindow, ipcMain } = require('electron');

const electronStoreExamples = require('./examples/electron-store');
const localFileExamples = require('./examples/local-file');
const sqliteNedbExamples = require('./examples/sqlite-nedb');
const osSecureStorageExample = require('./examples/os-secure-storage');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    setupIpcHandlers();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function setupIpcHandlers() {
    // Electron Store
    ipcMain.handle('electron-store-bad', async () => {
        try {
            const result = await electronStoreExamples.runBadExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('electron-store-good', async () => {
        try {
            const result = await electronStoreExamples.runGoodExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    // Local File Storage
    ipcMain.handle('local-file-bad', async () => {
        try {
            const result = await localFileExamples.runBadExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('local-file-good', async () => {
        try {
            const result = await localFileExamples.runGoodExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    // Database
    ipcMain.handle('database-bad', async () => {
        try {
            const result = await sqliteNedbExamples.runBadExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('database-good', async () => {
        try {
            const result = await sqliteNedbExamples.runGoodExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    // Secure Storage
    ipcMain.handle('secure-storage', async () => {
        try {
            const result = await osSecureStorageExample.runGoodExample();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    });
}

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});