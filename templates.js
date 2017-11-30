const swig = require('swig-templates')
const path = require('path')

swig.setDefaults({ cache: false })

class Template {
  constructor(config) {
    this.theme = config.theme
    this.templates = {}
    this.getTemplates()
  }

  get tags() {
    return 'index,archives,categories,category,page,post,tag,tags'.split(',')
  }

  get themesDir() {
    return path.join(process.cwd(), 'themes', this.theme, 'layout')
  }

  htmlPath(tag) {
    return path.join(this.themesDir, `${tag}.html`)
  }

  getTemplates() {
    this.tags.forEach((tag) => {
      try {
        this.templates[tag] = swig.compileFile(this.htmlPath(tag))
      } catch (e) {
        // ignore
      }
    })
  }
}

module.exports = Template
