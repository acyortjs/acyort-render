const pathFn = require('path')
const fs = require('fs')
const yaml = require('yamljs')
const Template = require('./template')

class Renderer extends Template {
  constructor(config) {
    super(config)
    this.publicDir = config.public_dir
    this.callback = () => {}
  }

  filePath(path) {
    return pathFn.join(process.cwd(), this.publicDir, path)
  }

  set status(fn) {
    this.callback = fn
  }

  render(path, tag, json) {
    const template = this.templates[tag]

    if (template) {
      fs.writeFileSync(this.filePath(path), template(data))
      this.callback(path)
    }
  }
}

module.exports = Renderer
