const router = require('express').Router();
const User = require('../models/user');
const verifyToken = require('../middlewares/verify-token');

const jwt = require('jsonwebtoken');

/* Signup Route */
router.post('/auth/signup', async (req, res) => {
    if (!req.body.email || !req.body.password) {   
        res.json({ success: false, message: 'Please enter email or password' });
    } else {
        try {
            let newUser = new User();       //create newUser object and save it to DB
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;

            await newUser.save();   
            let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {      //bcrypt the user object into JWT
                expiresIn: 604800 // 1 week
            });

            res.json({
                success: true,
                token: token,       //response with token
                message: "Successfully created a new User"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
});

/* Profile Route */
router.get('/auth/user', verifyToken, async (req, res) => {
    try {                                                          
        let foundUser = await User.findOne({ _id: req.decoded._id })    //we are passing the _id which is req.decoded._id to find specified id in the DB then return users object
        .populate('address'); 
        if (foundUser) {            // if user does exists
            res.json({
                success: true,
                user: foundUser         //return found user object
            });
        }
    } catch (err) {              //if user doesn't exists
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//Update a profile
router.put("/auth/user", verifyToken, async(req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.decoded._id});

        if(foundUser) {
            if(req.body.name ) foundUser.name = req.body.name;
            if(req.body.email ) foundUser.email = req.body.email;
            if(req.body.password) foundUser.password = req.body.password;

            await foundUser.save();

            res.json({
                success: true,
                message: "Successfully updated"
            })
        }
    }catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

/* Login route */
router.post('/auth/login', async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email });       //check if the email exists or not in the DB
        if (!foundUser) {               //if user doesn't exist
            res.status(403).json({
                success: false,
                message: "Authentication failed, User not found"
            })
        } else {            // if user does exists
            if (foundUser.comparePassword(req.body.password)) {     //check the password 
                let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {  // if password is correct, wrap the user's object in a token 
                    expiresIn: 604800 // 1 week                                
                })

                res.json({ success: true, token: token });           //response that token to the client so the client can store it token in the browser
            } else {                        //if password is not correct
                res.status(403).json({
                    success: false,
                    message: "Authentication failed, wrong password"
                })
            }
        }
    } catch (err) {      // if user is not found 
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;