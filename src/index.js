// Require dependencies for Electron
const {app, BrowserWindow, globalShortcut} = require('electron');
const { url } = require('inspector');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        // backgroundColor: '#ffff',
        // frame: false,
        titleBarStyle: 'hidden',
        transparent: true,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js'),
        // }
        icon: path.join(__dirname, 'icon.ico')
    });

    mainWindow.setTitle("School Bus Map")
    mainWindow.loadFile('page/index.html');
}

app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
]);

app.whenReady().then( () => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow() });
    globalShortcut.register('Control+Shift+I', () => {
        return false;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})