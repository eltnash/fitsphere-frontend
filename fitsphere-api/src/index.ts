import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import prisma from './utils/prisma';

// Load GraphQL schema
const schema = loadSchemaSync(join(__dirname, './graphql/schema/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

// Import resolvers
import { resolvers } from './graphql/resolvers';

// Create Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => ({
    prisma,
    // Add any additional context items here
  }),
});

// Start the server
const PORT = process.env.PORT || 4001;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🎉 GraphQL Playground available at ${url}graphql`);
}); 