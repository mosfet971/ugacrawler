const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { scanBatch } = require("./scanBatch.cjs");
const url = require("url")

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const contextMenu = require('electron-context-menu');

contextMenu({
	showSaveImageAs: true,
  showInspectElement: false,
  showSearchWithGoogle: false,
  showSelectAll: false,
  showCopyLink: true
});


console.log(__dirname);

function createWindow() {
  mainWindow = new BrowserWindow({

    icon: __dirname + '../media/logo',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#fff',
      symbolColor: '#000000',
      height: 25
    },
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true, // turn off remote
      // preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.maximize();

  //mainWindow.webContents.openDevTools();

  mainWindow.show();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: "file:",
    slashes: true
  }));
  //mainWindow.loadURL(path.join(__dirname, '../dist/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });


  ipcMain.handle("scan", async (e, params) => {

    let results = (await scanBatch(params.titleValue, 10, params.dd, params.mm));

    return results;
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});
