var mongoose = require('mongoose');

var Candidate = mongoose.model('Candidate', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    horsename: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    },
    company: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true
    },
    comments: {
        type: String,
        trim: true
    }
});

module.exports = {Candidate};