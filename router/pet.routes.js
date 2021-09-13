const express = require('express');
const router = express.Router();
const Pet = require('../models/pet')

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

router.get('/pet/:id', async (req, res) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
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
    res.redirect('/pet')
})



module.exports = router;