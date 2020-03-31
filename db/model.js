const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/seeAllPhotos');
// this processes photo within schema
// schema for user/photos
const PhotoSchema = new mongoose.Schema({
  id: Number,
  user_name: String,
  photo_title: String,
  date_added: Date,
  url_address: String,
  comment: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
