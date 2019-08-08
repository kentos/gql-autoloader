const fs = require('fs')
const path = require('path')
const merge = require('lodash.merge')

module.exports = ({ dir, typeDefs, resolvers }) => {
  const files = (fs.readdirSync(dir)).filter(f => f.indexOf('.js') > -1)
  const loaded = files.map(name => {
    if (name.indexOf('.js') > -1) {
      const fullpath = path.join(dir, name)
      const { typeDefs, resolvers } = require(fullpath)
      return {
        typeDefs,
        resolvers,
      }
    }
    return undefined
  }).filter(o => o)
  return loaded.reduce((acc, curr) => ({
    typeDefs: [...acc.typeDefs, curr.typeDefs],
    resolvers: merge({}, acc.resolvers, curr.resolvers),
  }), { typeDefs: [typeDefs], resolvers })
}
