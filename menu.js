const dialog = require('electron').dialog

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New File',
        accelerator: 'CmdOrCtrl+N',
        click: function(clickedMenuItem, focusedWindow) {
          focusedWindow.webContents.send('action-new-file', focusedWindow.id)
        }
      },
      {
        label: 'Open File...',
        accelerator: 'CmdOrCtrl+O',
        click: showOpenFileDialog
      },
      {type: 'separator'},
      {
        label: 'Save As...',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: showSaveFileDialog
      },
      {type: 'separator'},
      {role: 'quit'}
    ]
  },
  {role: 'editMenu'},
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: (function () {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        }
      }
    ]
  },
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
        focusedWindow.webContents.send('action-open-file', files[0], focusedWindow.id)
      }
    }
  )
}

function showSaveFileDialog(clickedMenuItem, focusedWindow) {
  dialog.showSaveDialog(
    focusedWindow,
    {
      filters: [{'name': 'Data files (*.js)', 'extensions': ['js']}],
      properties: ['saveFile']
    },
    function (file) {
      if (file) {
        focusedWindow.webContents.send('action-save-file', file, focusedWindow.id)
      }
    }
  )
}

module.exports = {
  'template': template
};
