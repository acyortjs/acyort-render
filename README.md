# acyort-render

[![Build Status](https://travis-ci.org/acyortjs/acyort-render.svg?branch=master)](https://travis-ci.org/acyortjs/acyort-render)
[![codecov](https://codecov.io/gh/acyortjs/acyort-render/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/acyort-render)

Renderer for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-render -S
```

### API

```js
const Renderer = require('acyort-render')

const renderer = new Renderer()
renderer.use('swig')    // default engine is swig, built-in engines are swig and yaml

renderer.render(text, data)
renderer.renderFile(file, data)

renderer
  .register('ejs', {    // register engine
    render: ejs.render
    renderFile: (file, data) => {
      const text = fs.readFileSync(file).toString()
      return ejs.render(text, data)
    }
  })
  .use('ejs')           // current engine
  .render(text, data)
```

## Usage

```js
const path = require('path')
const Renderer = require('acyort-render')
const fs = require('fs')

function dir(file) {
  return path.join(__dirname, file)
}

const renderer = new Renderer()

/*
home.html

<h1>{{ title }}</h1>
<div>{{ body }}</div>
*/

console.log(
  renderer.render(
    dir('home.html'),
    {
      title: 'AcyOrt',
      body: '<p>text</p>'
    }
  )
)
/*
<h1>AcyOrt</h1>
<div><p>text</p></div>
*/

renderer.use('yaml')
console.log(
  renderer.renderFile(dir('config.yml'))
)
/*
{ title: 'AcyOrt' }
*/

renderer
  .register('ejs', {
    render: ejs.render,
    renderFile: (file, data) => {
      const text = fs.readFileSync(file).toString()
      return ejs.render(text, data)
    }
  })
  .use('ejs')

console.log(
  renderer.renderFile(dir('ejs.html'), { title: 'AcyOrt' })
)

```
