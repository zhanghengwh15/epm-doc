const pkg = require('../package')

module.exports = {
  entry: 'src/index.js',
  output: {
    format: 'umd',
    moduleName: 'apollo',
    fileNames: {
      js: 'apollo.js',
      css: 'apollo.css'
    },
    clean: false
  },
  constants: {
    __DOCUTE_VERSION__: JSON.stringify(pkg.version),
    __PRISM_VERSION__: JSON.stringify(require('prismjs/package').version)
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    config.output.libraryExport('default')
  }
}
