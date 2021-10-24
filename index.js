// Require dependencies for Electron
const {app, BrowserWindow} = require('electron');
const { url } = require('inspector');
const path = require('path');


function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js'),
        // }
        icon: path.join(__dirname, 'directions_bus_yellow_24dp.svg')
    });

    mainWindow.setTitle("School Bus Map")
    mainWindow.loadFile('index.html');
}




app.whenReady().then( () => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow() });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})