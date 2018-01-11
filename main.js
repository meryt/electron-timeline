const electron = require('electron')
// Module to control application lifecycle
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const strings = require('./strings')
const ipc = electron.ipcMain
const util = require('util')

const path = require('path')
const url = require('url')

// Keep a global reference to the window object, to prevent it from
// being garbage-collected.
let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: strings.APP_TITLE
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  const menu = Menu.buildFromTemplate(require('./menu').template)
  Menu.setApplicationMenu(menu)

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  mainWindow.on('page-title-updated', function(event, title) {
    // Don't allow the rendered page to set the title
    event.preventDefault()
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

ipc.on('active-file-changed', function(event, filename, windowId) {

  let affectedWindow = BrowserWindow.fromId(windowId)

  if (!filename || filename.length === 0) {
    // Mac-Only - does not accept null; unsure what this should be
    affectedWindow.setRepresentedFilename('untitled.js')
  } else {
    affectedWindow.setRepresentedFilename(filename)
  }

  setTitleFromFilepath(filename, affectedWindow)
})

function setTitleFromFilepath(filepath, window) {
  var title
  if (!filepath || filepath.length === 0) {
    title = util.format('%s - %s',
      'untitled',
      strings.APP_TITLE)
  } else {
    title = util.format('%s - (%s) - %s',
      path.basename(filepath),
      path.dirname(filepath),
      strings.APP_TITLE)
  }

  window.setTitle(title)
}
