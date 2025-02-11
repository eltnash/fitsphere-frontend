import { ApolloServer } from 'apollo-server';
import { workoutResolvers } from './workout.resolver';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';

export const resolvers = {
  ...workoutResolvers
};

const typeDefs = loadSchemaSync(join(__dirname, '../schema/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add context here if needed
    return {};
  },
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });