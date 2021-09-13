const express = require('express');
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose');
const Pet = require('./models/pet');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const path = require('path');
const petRoutes = require('./router/pet.routes');
const { readdirSync } = require('fs');

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


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);
app.use(methodOverride('_method'))




app.use('/', petRoutes);







const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`"LISTENING ON PORT ${port}"`)
})