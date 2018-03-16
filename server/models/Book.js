const mongoose =require('mongoose');

const bookSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    stores: {
        type: [],
        default: null
    }
});

const Book =mongoose.model('books', bookSchema);

module.exports ={
    Book: Book
};