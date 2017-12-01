const path = require('path')
const assert = require('power-assert')
const Renderer = require('../')

function dir(file) {
  return path.join(__dirname, 'fixtures', file)
}

String.prototype.trim = function() {
  return this
    .replace(/\n/g, '')
    .replace(/[\t ]+\</g, '<')
    .replace(/\>[\t ]+\</g, '><')
    .replace(/\>[\t ]+$/g, '>')
}

describe('renderer', () => {
  it('swig', () => {
    const renderer = new Renderer()

    renderer.compile([{
      tag: 'home',
      path: dir('home.html')
    }])

    const result = renderer.render('swig', {
      tag: 'home',
      data: {
        title: 'AcyOrt',
        body: '<p>text</p>'
      }
    })

    assert(result.trim() === '<h1>AcyOrt</h1><div><p>text</p></div>')
  })

  it('no content', () => {
    const renderer = new Renderer()
    const result = renderer.render('swig', {
      tag: 'home',
      data: { title: 'AcyOrt' }
    })
    assert(result.trim() === '')
  })

  it('load yaml', () => {
    const renderer = new Renderer()
    const result = renderer.render('yaml', {
      path: dir('config.yml')
    })

    assert(result.title === 'AcyOrt')
  })

  it('parse yaml text', () => {
    const renderer = new Renderer()
    const result = renderer.render('yaml', {
      data: 'title: AcyOrt'
    })

    assert(result.title === 'AcyOrt')
  })
})
