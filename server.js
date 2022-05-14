const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

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
  await mongoose.connect('mongodb://127.0.0.1/post_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected....');

  // Listen
  app.listen(4000, function() {
    console.log('Server is running on port 4000');
  });
}

startServer();
