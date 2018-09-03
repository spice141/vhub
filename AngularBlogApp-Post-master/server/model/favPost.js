const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const favPostSchema = new Schema({
    post_id: { type: String, required: true },
    banner: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    asscField: { type: String, required: true },
    date: { type: String, required: true },
 
}, { collection : 'favposts' });

const Post = mongoose.model('FavPost', favPostSchema);
module.exports = Post;
