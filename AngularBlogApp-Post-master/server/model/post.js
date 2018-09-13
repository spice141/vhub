const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String},
  date: { type: String},
  asscField: { type: String},
  leadImage: { type: String},
  leadText: { type: String},
  leadTextCont: { type: String},
  publishPost: { type: String},
  paragraphs : [{
    image : String,
    heading : String,
    content : String,
    quote : String,
    contContent : String
     }]
  
}, { collection : 'post' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
