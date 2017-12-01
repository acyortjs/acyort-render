const path = require('path')
const Renderer = require('../')

function dir(file) {
  return path.join(__dirname, 'fixtures', file)
}

const renderer = new Renderer()

renderer.compile([{
  tag: 'home',
  path: dir('home.html')
}])

console.log(
  renderer.render('swig', {
    tag: 'home',
    data: {
      title: 'AcyOrt',
      body: '<p>text</p>'
    }
  })
)

console.log(
  renderer.render('yaml', {
    path: dir('config.yml')
  })
)

console.log(
  renderer.render('yaml', {
    data: 'title: AcyOrt'
  })
)
