const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petReviewSchema = new Schema({
    body: String,
    rating: Number

});

const petReviews = mongoose.model('PetReview', petReviewSchema)
module.exports = petReviews;