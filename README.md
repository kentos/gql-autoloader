# gql-autoloader
`gql-autloader` aims to make it faster and simpler to autload typedefs and resolvers when breaking up schemas.

## How to use gql-autoloader
You can use `gql-autoloader` preferably with Apollo Server.
We need to define "empty" typeDefs to be able to extend dynamically. (This is true right now, maybe not in later versions of Apollo Server)
```
const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const path = require('path')
const gqlAutoloader = require('gql-autoloader')

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`

const schema = makeExecutableSchema(
  gqlAutoloader({
    dir: path.join(__dirname, './gql'),
    typeDefs
  })
)

const apollo = new ApolloServer({
  ...
  schema,
  ...
})
```

# Changelog
1.3.0 - Handle undefined `typeDefs` or `resolvers` in files<br>
1.2.0 - Filter files that does'nt export `resolvers` or `typeDefs`<br>
1.1.0 - Adds recursively autoload<br>
1.0.1 - Readme update<br>
1.0.0 - Initial release