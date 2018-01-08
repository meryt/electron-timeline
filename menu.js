const os = require('os')
const electron = require('electron')

const app = electron.app
const Menu = electron.Menu
const shell = electron.shell
const dialog = electron.dialog

let template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File...',
        accelerator: 'CmdOrCtrl+O',
        click: showOpenFileDialog
      },
      {role: 'quit'}
    ]
  },
  {role: 'editMenu'},
  {role: 'windowMenu'}

]

function showOpenFileDialog(clickedMenuItem, focusedWindow) {
  dialog.showOpenDialog(
    focusedWindow,
    {
      filters: [{'name': 'Data files (*.js)', 'extensions': ['js']}],
      properties: ['openFile']
    },
    function (files) {
      if (files) {
        // Mac-Only
        focusedWindow.setRepresentedFilename(files[0])

        focusedWindow.webContents.send('action-open-file', files[0])
      }
    }
  )
}

app.on('ready', function() {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

module.exports = {

};
