const yaml = require('yamljs')
const swig = require('swig-templates')

swig.setDefaults({
  cache: false,
  autoescape: false,
})

class Renderer {
  constructor() {
    this.templates = {}
  }

  compile(templates) {
    templates.forEach((template) => {
      const { tag, path } = template
      this.templates[tag] = swig.compileFile(path)
    })
  }

  render(type, args) {
    const {
      tag,
      path,
      data,
    } = args

    if (type === 'swig') {
      const template = this.templates[tag]

      if (!template) {
        return ''
      }

      return template(data)
    }

    if (data) {
      return yaml.parse(data.toString())
    }

    return yaml.load(path)
  }
}

module.exports = Renderer
