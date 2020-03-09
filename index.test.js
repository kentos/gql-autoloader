const path = require('path')
const { readJSFilesFromDir, loadGQL } = require('./index')
const dir = './test/read-files'

describe('Read source files and require to read typeDefs and resolvers', () => {
  let files

  it('should read only js files from dir (and recursive)', () => {
    files = readJSFilesFromDir(dir)
    expect.assertions(files.length)
    files.forEach(fileName => expect(fileName.includes('.js')).toBeTruthy())
  })

  it('should load gql typedefs and resolvers', () => {
    const loaded = loadGQL(files.map(f => path.join(__dirname, f)))
    expect.assertions(loaded.length)
    loaded.forEach(obj => {
      expect(obj.typeDefs && obj.resolvers).toBeTruthy()
    })
  })
})