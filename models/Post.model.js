const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Now we will create the model, we have to set the name `post`
// During the creation it will be automatically pluralized e.g.
// posts
const Post = mongoose.model('post', PostSchema);

module.exports = Post;
