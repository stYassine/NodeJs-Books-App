const mongoose =require('mongoose');

const storeSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true
    }
});

const Store =mongoose.model('stores', storeSchema);

module.exports ={
    Store: Store
};