const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// GraphQl TypeDefinitions and Resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Initialize our express app
  const app = express();

  // Initialize our Apollo graphql server
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });

  // Start the Apollo graphql server, If we don't write this then it will automatically
  // start, but I highly recommend this.
  await apolloServer.start();

  // Apply middleware
  apolloServer.applyMiddleware({ app: app, path: '/gql' });

  // http://localhost:4000/graphql route is handled by apolloServer, all other routes
  // are handled by our express app, we will make sure in the bottom code snippet.
  // Now when we will open http://localhost:4000/ this message will be appear.
  app.use(function(req, res) {
    res.json({
      message: 'Not Found'
    });
  });

  // Established a connection with the mongoose
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongodb connected....');
  } catch (err) {
    console.log(err.message);
  }

  // Listen
  app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
