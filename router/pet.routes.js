const express = require('express');
const app = express();
const router = express.Router();
const Pet = require('../models/pet');
const petReviews = require('../models/petreviews');
const catchAsync = require('../utils/catchAsymc')


const genders = ['', 'male', 'female']

router.get('/', async (req, res) => {
    const pets = await Pet.find({});
    res.render('home', { pets })
})

router.get('/pet/new', (req, res) => {
    res.render('./pets/new', { genders })
})

router.post('/pet', async (req, res) => {
    const pet = new Pet(req.body.pet);
    await pet.save();
    res.redirect(`/pet/${pet._id}`)
})

router.post('/pet/:id/reviews', async (req, res) => {
    const { id } = req.params;
    console.log(req)
    const pet = await Pet.findById(id);
    const review = new petReviews(req.body.petReviews);
    pet.petReviews.push(review);
    await review.save();
    await pet.save();
    res.redirect(`/pet/${pet._id}`)
})


router.get('/pet/:id', async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id).populate('petReviews');
    console.log(req)
    res.render('./pets/show', { pet })
})

router.get('/pet/:id/edit', async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    res.render('./pets/edit', { pet, genders })
})

router.put('/pet/:id', async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByIdAndUpdate(id, { ...req.body.pet });
    res.redirect(`/pet/${pet._id}`)

})



router.delete('/pet/:id', async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete(id)
    res.redirect('/')
})

//still error cant delete lets check
router.delete('/pet/:id/reviews/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;

    await Pet.findByIdAndUpdate(id, { $pull: { petReviews: reviewId } })
    await petReviews.findByIdAndDelete(reviewId)

    res.redirect(`/pet/${id}`)
})





module.exports = router;