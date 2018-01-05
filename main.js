const electron = require('electron')
// Module to control application lifecycle
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference to the window object, to prevent it from
// being garbage-collected.
let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  // On Mac, leave the app running even if the last window is closed.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On Mac, create a new window if all windows are closed and dock
  // icon is clicked.
  if (mainWindow === null) {
    createWindow()
  }
})

// Add application-specific main process code here.  Or, put it in separate
// files and require them here.
