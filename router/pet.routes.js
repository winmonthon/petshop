const express = require('express');
const app = express();
const router = express.Router();
const Pet = require('../models/pet');
const petReviews = require('../models/petreviews');
const catchAsync = require('../utils/catchAsymc')
const ExpressError = require('../utils/ExpressError')


const genders = ['', 'male', 'female']

router.get('/', async (req, res) => {
    const pets = await Pet.find({});
    res.render('home', { pets })
})

router.get('/pet/new', (req, res) => {
    res.render('./pets/new', { genders })
})

router.post('/pet', catchAsync(async (req, res) => {
    const pet = new Pet(req.body.pet);
    await pet.save();
    res.redirect(`/pet/${pet._id}`)
}))

router.post('/pet/:id/reviews', catchAsync(async (req, res) => {
    const { id } = req.params;

    const pet = await Pet.findById(id);
    const review = new petReviews(req.body.petReviews);
    pet.petReviews.push(review);
    await review.save();
    await pet.save();
    res.redirect(`/pet/${pet._id}`)
}))


router.get('/pet/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id).populate('petReviews');

    res.render('./pets/show', { pet })
}))

router.get('/pet/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    res.render('./pets/edit', { pet, genders })
}))

router.put('/pet/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByIdAndUpdate(id, { ...req.body.pet });
    res.redirect(`/pet/${pet._id}`)

}))



router.delete('/pet/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete(id)
    res.redirect('/')
}))


router.delete('/pet/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Pet.findByIdAndUpdate(id, { $pull: { petReviews: reviewId } })
    await petReviews.findByIdAndDelete(reviewId)
    res.redirect(`/pet/${id}`)
}))





module.exports = router;