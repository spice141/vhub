const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  asscField: { type: String, required: true },
  leadImage: { type: String, required: true },
  leadText: { type: String, required: true },
  leadTextCont: { type: String, required: true },
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
