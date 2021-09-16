const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const petReviews = require('./petreviews')

const PetSchema = new Schema({
    title: String,
    name: String,
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
    age: {
        type: Number,
        require: true,
        min: 0
    },
    petReviews: [{
        type: Schema.Types.ObjectId,
        ref: 'PetReview'
    }]

})

PetSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await petReviews.remove({
            _id: {
                $in: doc.petReviews
            }
        })
    }
})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet;