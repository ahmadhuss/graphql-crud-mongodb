const Post = require('./models/Post.model');

// Resolvers
// This resolver object contain all the resolvers for the queries
// and mutations

/**
 * Graphql playground for queries:
 query {
  hello
  getAllPosts {
    id
    title
    description
    createdAt
  }
  getPost(id: "627fd62b33514510cf09ee1c") {
    id
    title
    description
    createdAt
  }
}

 * Graphql playground for mutations:
 mutation {
  createPost(post: { title: "Third Hello World", description: "Lorem ipsum" }) {
    id
    title
    description
    createdAt
  }

  deletePost(id: "627fd62b33514510cf09ee1c")

  updatePost(id: "627fd62b33514510cf09ee1c", post: { title: "Hello World 2" }) {
    id
    title
    description
    createdAt
  }
}
 */

const resolvers = {
  // This block is for only queries
  Query: {
    hello: () => {
      return 'Hello World';
    },
    getAllPosts: async () => {
      const posts = await Post.find({ isDeleted: false });
      return posts;
    },
    getPost: async (parent, args, context, info) => {
      const { id } = args;
      const post = await Post.findOne({ _id: id, isDeleted: false });
      return post;
    }
  },
  // This block is only for mutations
  Mutation: {
    createPost: async (parent, args, context, info) => {
      // args object has our custom input type "post: PostInput"
      const { title = '', description = '' } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndUpdate(id, { isDeleted: true });
      return 'Ok, Post has been deleted!';
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};

      // Either user can update title or maybe description
      if (title !== 'undefined') {
        updates.title = title;
      }

      if (description !== 'undefined') {
        updates.description = description;
      }

      const updatedPost = await Post.findOneAndUpdate(
        { _id: id, isDeleted: false },
        updates,
        { new: true }
      );
      return updatedPost;
    }
  }
};

module.exports = resolvers;
