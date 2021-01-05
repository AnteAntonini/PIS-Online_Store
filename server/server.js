const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); //to load up the file


const app = express();



// MIDDLEWARES  
app.use(morgan('dev'));    //so we can see all the logs on the terminal
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//GET - Retrieve data from the server
app.get('/', (req,res) => {
    res.json('hello from server')
});
//POST - send data from frontend to backend

app.listen(3000, err => {
    if(err) {
        console.log(err);
    } else {
        console.log('listening on PORT', 3000);
    }
});