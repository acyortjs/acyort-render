# Renderer

[![Build Status](https://travis-ci.org/acyortjs/renderer.svg?branch=master)](https://travis-ci.org/acyortjs/renderer)
[![codecov](https://codecov.io/gh/acyortjs/renderer/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/renderer)

Node Renderer

## Install

```bash
$ npm i @acyort/renderer -S
```

## Usage

```js
const Renderer = require('@acyort/renderer')

const renderer = new Renderer()

// default engine swig, yaml and markdown
renderer.render('swig', { title: 'swig' })
renderer.renderFile('swig', 'html path', { title: 'swig' })

renderer.render('yaml', 'title: yaml')
renderer.renderFile('yaml', 'yml path')

renderer.render('markdown', '# h1')
renderer.renderFile('markdown', 'markdown path')

// engine register
renderer.register('ejs', {
  render: ejs.render,
  renderFile: (file, data) => {
    const text = fs.readFileSync(file).toString()
    return ejs.render(text, data)
  }
})
```
