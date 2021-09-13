const Pet = require('./models/pet');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://monthon:winwin00@mydb01.ejx8a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log('MONGO CONNECTION ERROR')
        console.log(err)
    })


const seedDB = async () => {
    const pet = new Pet({
        title: 'Lion',
        image: 'https://source.unsplash.com/collection/1550567',
        price: 500,
        gender: 'male',
        stock: 2

    })
    await pet.save();
}

seedDB().then(() => {
    mongoose.connection.close()
})