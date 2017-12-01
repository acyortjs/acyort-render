# acyort-render

Render for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-render -S
```

## Usage

```js
const path = require('path')
const Renderer = require('acyort-render')

function dir(file) {
  return path.join(__dirname, file)
}

const renderer = new Renderer()

/*
home.html

<h1>{{ title }}</h1>
<div>{{ body }}</div>
*/
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
/*
<h1>AcyOrt</h1>
<div><p>text</p></div>
*/

console.log(
  renderer.render('yaml', {
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
