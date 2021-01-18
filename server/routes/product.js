const router = require('express').Router();  //we want to group our API
const Product = require('../models/product');

//MIDDLEWARES
const upload = require('../middlewares/upload-photo');


//POST request - create a new product
router.post('/products',  async (req, res) => {     //middleware -> upload.single("photo"), upload.single -> we just want to upload a single photo 
    try {
        let product = new Product();
        product.title = req.body.title;
        product.ownerID = req.body.ownerID;
        product.categoryID = req.body.categoryID;
        product.description = req.body.description;
        /* product.photo = req.file.location;    */               //sprema lokaciju file iz AWS bucker S3  u DB pod photo, u photo ce ic URL od lokacije
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();  

        res.json({
            status: true,
            message: "Successfully saved"
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.messages
        })
    }
    
});

//GET request - get all products
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find()
        .populate('owner category')         
        .populate('reviews', 'rating') 
        .exec();

        res.json({
            success: true,
            products: products
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// GET request - get a single product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id}) 
            /* .populate('owner category')
            .populate('reviews', 'rating')
            .exec(); */
            
        res.json({
            success: true,
            product: product
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//PUT request - update a single product
router.put('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set: {                       
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                description: req.body.description,
                stockQuantity: req.body.stockQuantity,
                owner: req.body.ownerID
                /* product.photo = req.file.location */
            }
        },
        {upsert: true}); //if id doesn't exists in DB, then create this new object (new product)

        res.json({
            success: true,
            updatedProduct: product  
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//DELETE request - delete a single product
router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});

        if(deletedProduct) {
            res.json({
                status: true,
                message: "Successfully deleted"
            });
        }    
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;