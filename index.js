const fs = require('fs')
const path = require('path')
const merge = require('lodash.merge')

function testFileName(fileName) {
  return fileName.indexOf('.js') > -1
}

function readJSFilesFromDir(dir) {
  const sourceFiles = []
  const readdir = fs.readdirSync(dir)
  readdir.forEach(d => {
    const entityPath = path.join(dir, d)
    if (fs.statSync(entityPath).isDirectory()) {
      readJSFilesFromDir(entityPath).forEach(f => {
        sourceFiles.push(f)
      })
    }
    if (testFileName(entityPath)) {
      sourceFiles.push(entityPath)
    }
  })
  return sourceFiles
}

function loadGQL(filePaths) {
  return filePaths.map(name => {
    if (!testFileName(name)) {
      return undefined
    }
    const { typeDefs, resolvers } = require(name)
    if (!typeDefs && !resolvers) {
      return undefined
    }
    return { typeDefs, resolvers }
  }).filter(o => o)
}

function readGQL({ dir, typeDefs, resolvers }) {
  const files = readJSFilesFromDir(dir)
  const loaded = loadGQL(files)
  return loaded.reduce((acc, curr) => ({
    typeDefs: [...acc.typeDefs, curr.typeDefs],
    resolvers: merge({}, acc.resolvers, curr.resolvers),
  }), { typeDefs: [typeDefs], resolvers })
}

module.exports = readGQL
module.exports.readJSFilesFromDir = readJSFilesFromDir
module.exports.loadGQL = loadGQL