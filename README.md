# acyort-render

[![Build Status](https://travis-ci.org/acyortjs/acyort-render.svg?branch=master)](https://travis-ci.org/acyortjs/acyort-render)
[![codecov](https://codecov.io/gh/acyortjs/acyort-render/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/acyort-render)

Render for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-render -S
```

## Usage

```js
const path = require('path')
const render = require('acyort-render')

function dir(file) {
  return path.join(__dirname, file)
}

/*
home.html

<h1>{{ title }}</h1>
<div>{{ body }}</div>
*/

console.log(
  render('swig', {
    path: dir('home.html'),
    data: {
      title: 'AcyOrt',
      body: '<p>text</p>'
    }
  })
)
/*
<h1>AcyOrt</h1>
<div><p>text</p></div>
*/

console.log(
  render('yaml', {
    path: dir('config.yml')
  })
)
/*
{ title: 'AcyOrt' }
*/

console.log(
  renderer.render('yaml', {
    data: 'title: AcyOrt'
  })
)
/*
{ title: 'AcyOrt' }
*/
```
