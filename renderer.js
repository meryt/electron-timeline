const ipc = require('electron').ipcRenderer
const vis = require('vis')
const fileManager = require('./file-manager')

let timelineDiv = document.getElementById('timeline')

let items = new vis.DataSet()
let groups = new vis.DataSet()
let options = {
  'margin': {'item': {'horizontal': -1}},
  'editable': true
}

ipc.on('action-new-file', function(event, windowId) {
  items.clear()
  groups.clear()
  ipc.send('active-file-changed', null, windowId)
})

ipc.on('action-open-file', function(event, filePath, windowId) {
  let data = fileManager.loadFileFromPath(filePath)
  if (!data) {
    return
  }

  items.clear()
  groups.clear()

  items.add(data.items)

  if (typeof(data.groups) !== 'undefined' && data.groups.length > 0) {
    groups.add(data.groups)
    let timeline = new vis.Timeline(timelineDiv, items, groups, options)
  } else {
    let timeline = new vis.Timeline(timelineDiv, items, options)
  }

  ipc.send('active-file-changed', filePath, windowId)
})

ipc.on('action-save-file', function(event, filePath, windowId) {
  var output = {
    'items': items.get(),
    'groups': groups.get()
  }

  fileManager.saveDataToPath(filePath, output)

  ipc.send('active-file-changed', filePath, windowId)
})
