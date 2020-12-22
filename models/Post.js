const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating: Number,
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts',animeSchema);

