const yaml = require('yamljs')
const swig = require('swig-templates')

swig.setDefaults({
  cache: false,
  autoescape: false,
})

function render(type, args) {
  const { path, data } = args

  if (type === 'swig') {
    return swig.renderFile(path, data)
  }

  if (data) {
    return yaml.parse(data.toString())
  }

  return yaml.load(path)
}

module.exports = render
