const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const User = require('./models/user');

dotenv.config(); //to load up .env the file


const app = express();

mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
})



// MIDDLEWARES  
app.use(morgan('dev'));    //so we can see all the logs on the terminal
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// require APIs
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');
const userRoutes = require('./routes/auth');


app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', userRoutes);


app.listen(3000, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('listening on PORT', 3000);
    }
});