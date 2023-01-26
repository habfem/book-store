const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

// API
// api for genres
app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if (err) {
			throw err;
		}
		res.json(genres);
	});
});

// Add genres
// POSTMAN, ARC; chrome add-in can be used to make post request
app.post('/api/genres', (req, res) => {
	const genre = req.body;
	Genre.addGenres(genre, (err, genre) => {
		if (err) {
			throw err;
		}
		res.json(genre);
	});
});

//update genres
app.put('/api/genres/:_id', (req, res) => {
	const id = req.params._id;
	const genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if (err) {
			throw err;
		}
		res.json(genre);
	});
});

// Delete 
app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if (err) {
			throw err;
		}
		res.json(genre);
	});
});


// api for books
app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if (err) {
			throw err;
		}
		res.json(books);
	});
});

// api for each book by id
app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});

// add book
app.post('/api/books', (req, res) => {
	const book = req.body;
	Book.addBook(book, (err, book) => {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});

// Update book
app.put('/api/books/:_id', (req, res) => {
	const id = req.params._id;
	const book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if (err) {
			throw err;
		}
		res.json(book);
	});
});


app.listen(5000);

console.log('Running on port 5000....')