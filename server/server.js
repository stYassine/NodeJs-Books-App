const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const app =express();
const PORT =process.env.PORT || 8080;


////////////////////////////////
/// Connect To Database
////////////////////////////////
mongoose.Promise =global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/store');


////////////////////////////////
/// Middlewares
////////////////////////////////
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public'));



////////////////////////////////
/// Models
////////////////////////////////
const {Book} =require('./models/Book');
const {Store} =require('./models/Store');



////////////////////////////////
/// Routes
////////////////////////////////

/// stores

/// get all stores
app.get('/stores', (request, response) => {

    Store.find((err, stores) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(stores);
    });

});

/// add new store
app.post('/stores', (request, response) => {

    const store =new Store({
        name: request.body.name,
        address: request.body.address,
        phone: request.body.phone
    });

    store.save((err, store) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(store);
    });

});



/// books

/// get all books
app.get('/books', (request, response) => {

    const limit =request.query.limit ? parseInt(request.query.limit) : 10;
    const order =request.query.order ? request.query.order : 'asc';


    Book.find()
        .limit(limit)
        .sort({_id: order})
        .exec((err, books) => {
            if(err){
                response.status(400).send(err);
            }
                response.status(200).json(books);
        });

});

/// get single book by id
app.get('/books/:id', (request, response) => {

    Book.findById(request.params.id, (err, book) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(book);
    });

});

/// add new book
app.post('/books', (request, response) => {

    const book =new Book({
        title: request.body.title,
        author: request.body.author,
        price: request.body.price,
        pages: request.body.pages,
        stores: request.body.stores
    });

    book.save((err, book) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(book);
    });

});



/// update book
app.put('/books/:id', (request, response) => {

    const book_id =request.params.id;

    const query ={
        title: request.body.title,
        author: request.body.author,
        price: request.body.price,
        pages: request.body.pages,
        stores: request.body.stores
    };

    Book.findByIdAndUpdate(book_id, query, (err, book) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(book);
    });

});



/// remove book
app.delete('/books/:id', (request, response) => {

    const book_id =request.params.id;

    Book.findByIdAndRemove(book_id, (err, book) => {
        if(err){
            response.status(400).send(err);
        }
            response.status(200).json(book);
    });

});




////////////////////////////////
/// Listen to the server
////////////////////////////////
app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
        console.log(`Your Server Is Running On Port ${PORT}`);
});