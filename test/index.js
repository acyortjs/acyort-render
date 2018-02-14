const path = require('path')
const assert = require('power-assert')
const ejs = require('ejs')
const Renderer = require('../')
const fs = require('fs')

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

const renderer = new Renderer()

describe('renderer', () => {
  it('swig render file', () => {
    const result = renderer.renderFile(
      dir('home.html'),
      {
        title: 'AcyOrt',
        body: '<p>text</p>'
      }
    )

    assert(result.trim() === '<h1>AcyOrt</h1><div><p>text</p></div>')
  })

  it('swig render', () => {
    const result = renderer.render(
      fs.readFileSync(dir('home.html')).toString(),
      {
        title: 'AcyOrt',
        body: '<p>text</p>'
      }
    )

    assert(result.trim() === '<h1>AcyOrt</h1><div><p>text</p></div>')
  })

  it('yaml render file', () => {
    renderer.use('yaml')
    const result = renderer.renderFile(dir('config.yml'))
    assert(result.title === 'AcyOrt')
  })

  it('yaml render text', () => {
    renderer.use('yaml')
    const result = renderer.render('title: AcyOrt')
    assert(result.title === 'AcyOrt')
  })

  it('add engine', () => {
    renderer
      .register('ejs', {
        render: ejs.render,
        renderFile: (file, data) => {
          const text = fs.readFileSync(file).toString()
          return ejs.render(text, data)
        }
      })
      .use('ejs')

    let result = renderer.render(fs.readFileSync(dir('ejs.html')).toString(), { title: 'AcyOrt' })
    assert(result.trim() === '<h1>AcyOrt</h1>')

    result = renderer.renderFile(dir('ejs.html'), { title: 'AcyOrt' })
    assert(result.trim() === '<h1>AcyOrt</h1>')

    renderer.register('ejs', {})
    assert(Object.keys(renderer).length === 2)

    renderer.use('ejs').use('no exists')
    assert(renderer.engine === 'ejs')
  })
})
