const path = require('path')
const { readJSFilesFromDir, loadGQL, reduceLoadedFiles } = require('./index')
const dir = './test/read-files'

describe('Read source files and require to read typeDefs and resolvers', () => {
  let files
  let loaded

  it('should read only js files from dir (and recursive)', () => {
    files = readJSFilesFromDir(dir)
    expect.assertions(files.length)
    files.forEach(fileName => expect(fileName.includes('.js')).toBeTruthy())
  })

  it('should load gql typedefs and resolvers', () => {
    loaded = loadGQL(files.map(f => path.join(__dirname, f)))
    expect.assertions(loaded.length)
    loaded.forEach(obj => {
      expect(obj.typeDefs || obj.resolvers).toBeTruthy()
    })
  })

  it('should not expect typedefs and resolvers to exist in the same file, ie. filter undefined', () => {
    const result = reduceLoadedFiles({ loaded, resolvers: {}, typeDefs: {} })
    result.typeDefs.forEach(def => expect(def).toBeDefined())
    Object.keys(result.resolvers).forEach(res => expect(result[res]).toBeDefined())
  })
})