const path = require('path')
const assert = require('power-assert')
const render = require('../')

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
    const result = render('swig', {
      path: dir('home.html'),
      data: {
        title: 'AcyOrt',
        body: '<p>text</p>'
      }
    })

    assert(result.trim() === '<h1>AcyOrt</h1><div><p>text</p></div>')
  })

  it('load yaml', () => {
    const result = render('yaml', {
      path: dir('config.yml')
    })

    assert(result.title === 'AcyOrt')
  })

  it('parse yaml text', () => {
    const result = render('yaml', {
      data: 'title: AcyOrt'
    })

    assert(result.title === 'AcyOrt')
  })
})
