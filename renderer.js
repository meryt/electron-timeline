
const vis = require('vis')

let timelineDiv = document.getElementById('timeline')

let items = new vis.DataSet([
  {id: 1, content: 'item 1', start: '2013-04-20'}
])

let options = {}

let timeline = new vis.Timeline(timelineDiv, items, options)
