const fs = require('fs')
const assert = require('assert')
const dialog = require('electron').remote.dialog

module.exports = {
  "loadFileFromPath": function(filePath) {
    try {
      let file = fs.readFileSync(filePath, "utf8")
      let data = JSON.parse(file)
      validateFileContents(data)
      return data
    } catch (err) {
      dialog.showErrorBox("Error Loading File", err.message)
      return null
    }
  },

  "saveDataToPath": function(filePath, data) {
    let fstream = fs.createWriteStream(filePath);
    fstream.once('open', function(fd) {
      fstream.write(JSON.stringify(data, null, '  ') + "\n")
      fstream.end()
    })
    fstream.on('error', function(err) {
      fstream.end()
      dialog.showErrorBox("Error Saving File", err.message)
    })
  }
};

function validateFileContents(data) {
  assert.ok(data)
  assert.ok(Array.isArray(data.items), 'Data file is malformed (does not contain a list of timeline "items")')
  assert.ok(typeof(data.groups) === 'undefined' || Array.isArray(data.groups),
    'Data file is malformed ("groups" is not a list)')
}
