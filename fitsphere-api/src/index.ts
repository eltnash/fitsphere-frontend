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

let server: ApolloServer | null = null;

async function startServer() {
  try {
    // Ensure only one server instance exists
    if (server) {
      await server.stop();
    }

    // Create Apollo Server
    server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      context: ({ req }) => ({
        prisma,
      }),
    });

    const PORT = process.env.PORT || 4001;
    const { url } = await server.listen(PORT);
    
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🎉 GraphQL Playground available at ${url}graphql`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  if (server) {
    await server.stop();
  }
  process.exit(0);
});

startServer(); 