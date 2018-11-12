const { readFileSync } = require('fs')
const yaml = require('js-yaml')
const swig = require('swig-templates')
const Markdown = require('@acyort/markdown')

swig.setDefaults({
  cache: false,
  autoescape: false,
})

const markdown = new Markdown({ lineNumbers: true })

module.exports = class {
  constructor() {
    this.engines = {
      swig: {
        render: (text, data, ...params) => swig.render(text, { locals: data }, ...params),
        renderFile: swig.renderFile,
      },
      yaml: {
        render: yaml.safeLoad,
        renderFile: (path, ...params) => yaml.safeLoad(readFileSync(path, 'utf8'), ...params),
      },
      markdown: {
        render: markdown.parse.bind(markdown),
        renderFile: (path, ...params) => markdown.parse(readFileSync(path, 'utf8'), ...params),
      },
    }
  }

  register(engine, methods) {
    this.engines[engine] = methods
  }

  render(engine, ...params) {
    if (!this.engines[engine]) {
      throw new Error(`cannot find render engine: ${engine}`)
    }
    return this.engines[engine].render(...params)
  }

  renderFile(engine, ...params) {
    if (!this.engines[engine]) {
      throw new Error(`cannot find render engine: ${engine}`)
    }
    return this.engines[engine].renderFile(...params)
  }
}
