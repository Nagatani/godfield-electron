const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1080,
    height: 768,
    resizable: false,
  });

  mainWindow.loadURL('https://godfield.net/');

  const injectCSS = (function () {/*
    body,html {
        margin: 0;
        height: 100%;
    }
    aside#ad-left {
        display: none;
        visibility: hidden;
    }
    div#container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div#main {
        left: 0;
        position: static !important;
    }
  */}).toString().match(/(?:\/\*(?:[\s\S]*?)\*\/)/).pop().replace(/^\/\*/, "").replace(/\*\/$/, "");

  mainWindow.webContents.on('did-finish-load', function() {
     mainWindow.webContents.insertCSS(injectCSS);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => { app.quit(); });
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const webview = document.querySelector('webview');
webview.addEventListener('dom-ready', () => {
  if (!app.isPackaged) {
    webview.openDevTools();
  }
});
