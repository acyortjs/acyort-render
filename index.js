const yaml = require('yamljs')
const swig = require('swig-templates')

swig.setDefaults({
  cache: false,
  autoescape: false,
})

class Renderer {
  constructor() {
    this.engines = {
      swig: {
        render: (text, data) => swig.render(text, { locals: data }),
        renderFile: swig.renderFile,
      },
      yaml: {
        render: yaml.parse.bind(yaml),
        renderFile: yaml.load.bind(yaml),
      },
    }
    this.engine = 'swig'
  }

  register(engine, args) {
    if (!this.engines[engine]) {
      this.engines[engine] = args
    }
    return this
  }

  use(engine) {
    if (this.engines[engine]) {
      this.engine = engine
    }
    return this
  }

  render(text, data) {
    return this.engines[this.engine].render(text, data)
  }

  renderFile(file, data) {
    return this.engines[this.engine].renderFile(file, data)
  }
}

module.exports = Renderer
