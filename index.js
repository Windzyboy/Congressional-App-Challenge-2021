// Require dependencies for Electron
const {app, BrowserWindow, globalShortcut, shell} = require('electron');
const { url } = require('inspector');
const path = require('path');

function createWindow() {

    // What the f***?????? Well of course the StackOverflow code from 4 years ago breaks.
    // const handleRedirect = (e, url) => {
    //     if (url !== e.sender.getURL()) {
    //       e.preventDefault()
    //       shell.openExternal(url)
    //     }
    // }

    // From another function (now deleted, trying to do the same thing)
        // I couldn't get this to work. It always says that I haven't actually initialized ipcRenderer (EVEN THOUGH IT'S RIGHT THERE???)

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        minWidth: 400,
        minHeight: 400,
        // backgroundColor: '#ffff',
        // frame: false,
        titleBarStyle: 'hidden',
        transparent: true,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js'),
            // used for IPC
        // },
        icon: path.join(__dirname, 'icon.ico')
    });

    // This function took HOURS to figure out. And nobody will ever know. Except for you. :)
    // Comments above explain. Electron is very restrictive of what windows allows to open. I needed to bypass this.
    // Look at this doc for more. https://github.com/electron/electron/blob/v12.0.2/docs/api/window-open.md#opening-windows-from-the-renderer
    // DON'T use absurd window.open functions.
    // DO write a handler in your main window code like I did right here. It allows for ACTUAL EXTERNAL LINKS to work properly.

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://github.com/')) {
            shell.openExternal(url);
        }
        return { action: 'deny' }
    })
    mainWindow.setTitle("School Bus Map")
    mainWindow.loadFile('src/index.html');
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
    
    // unbind devtools
    // globalShortcut.register('Control+Shift+I', () => {
    //     return false;
    // });
    // globalShortcut.register('Control+W', () => {
    //     return false;
    // });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})