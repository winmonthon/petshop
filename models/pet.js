const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const petReviews = require('./petreviews')

const PetSchema = new Schema({
    title: String,
    image: String,
    price: {
        type: Number,
        require: true,
        min: 0
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female']
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    },
    petReviews: [{
        type: Schema.Types.ObjectId,
        ref: 'PetReview'
    }]

})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet;