/* global describe it */
/* eslint no-extend-native: 0 */

const path = require('path')
const assert = require('power-assert')
const ejs = require('ejs')
const fs = require('fs')
const expect = require('expect')
const Renderer = require('../')

function dir(file) {
  return path.join(__dirname, 'fixtures', file)
}

String.prototype.trim = function trim() {
  return this
    .replace(/\n/g, '')
    .replace(/[\t ]+</g, '<')
    .replace(/>[\t ]+</g, '><')
    .replace(/>[\t ]+$/g, '>')
}

const renderer = new Renderer()

describe('renderer', () => {
  it('swig render file', () => {
    const result = renderer.renderFile('swig', dir('home.html'), { title: 'swig' })
    assert(result.trim() === '<h1>swig</h1>')
  })

  it('swig render', () => {
    const result = renderer.render(
      'swig',
      fs.readFileSync(dir('home.html')).toString(),
      { title: 'swig' },
    )
    assert(result.trim() === '<h1>swig</h1>')
  })

  it('yaml render file', () => {
    const result = renderer.renderFile('yaml', dir('config.yml'))
    assert(result.title === 'yaml')
  })

  it('yaml render text', () => {
    const result = renderer.render('yaml', 'title: yaml')
    assert(result.title === 'yaml')
  })

  it('markdown render text', () => {
    const result = renderer.render('markdown', '# h1', { simpleMode: true })
    assert(result.trim() === '<h1>h1</h1>')
  })

  it('markdown render file', () => {
    const result = renderer.renderFile('markdown', dir('markdown.md'))
    assert(result.trim() === '<h1><a href="#h1" id="h1" class="heading"></a>h1</h1>')
  })

  it('add engine', () => {
    renderer.register('ejs', {
      render: ejs.render,
      renderFile: (file, data) => {
        const text = fs.readFileSync(file).toString()
        return ejs.render(text, data)
      },
    })

    let result = renderer.render(
      'ejs',
      fs.readFileSync(dir('ejs.html')).toString(),
      { title: 'ejs' },
    )
    assert(result.trim() === '<h1>ejs</h1>')

    result = renderer.renderFile('ejs', dir('ejs.html'), { title: 'ejs' })
    assert(result.trim() === '<h1>ejs</h1>')
  })

  it('no exist engine', async () => {
    expect(() => { renderer.render('no exist', '') }).toThrow('cannot find render engine: no exist')
    expect(() => { renderer.renderFile('no exist', '') }).toThrow('cannot find render engine: no exist')
  })
})
