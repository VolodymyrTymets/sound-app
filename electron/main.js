const path = require('path');
const { app, BrowserWindow } = require('electron');

app.setName('Electron APIs');

let mainWindow = null;

function createWindow () {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
  };

  mainWindow = new BrowserWindow(windowOptions);

  mainWindow.loadURL(path.join('file://', __dirname, './client/build/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null,
  });
}

app.on('ready', () => {
  createWindow();
  autoUpdater.initialize()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});


