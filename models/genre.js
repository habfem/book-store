const mongoose = require('mongoose');

// Genere Schema
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

const Genre = module.exports = mongoose.model('Genre', genreSchema);

//// imprtant to make API in JSON
//Get Genres
module.exports.getGenres = (callback, limit) => {
	Genre.find(callback).limit(limit);
};

//Add Genre
module.exports.addGenres = (genre, callback) => {
	Genre.create(genre, callback)
};

// update Genre
module.exports.updateGenre = (id, genre, options, callback) => {
	const query = {_id: id};
	const update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}

// Delete Genre
module.exports.removeGenre = (id, callback) => {
	var query = {_id: id};
	Genre.remove(query, callback);
}