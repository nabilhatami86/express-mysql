const router = require('express').Router();
const multer = require('multer');
const Product = require('./model')
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const path = require('path');


router.post('/product/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, stock, status } = req.body;
        const image = req.file;

        let imageUrl = null;
        if (image) {
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target);
            imageUrl = `http://localhost:3000/public/${image.originalname}`;
        }
        const newProduct = await Product.create({ 
            name, 
            price, 
            stock, 
            status,
            image_url: imageUrl 
        });

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'There was an error creating the product', error: error.message });
    }
});


router.get('/product', (req, res) =>{
    Product.find()
    .then(result => res.send(result))
    .catch(error => res.send(error));
});


router.get('/product/:id', (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(error => res.status(500).json({ error: error.message }));
});


router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Product.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Product deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
});



router.put('/product/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);

        try {
            const result = await Product.findByIdAndUpdate(id, {
                name,
                price,
                stock,
                status,
                image_url: `http://localhost:3000/public/${image.originalname}`
            }, { new: true });

            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).json({ error: 'Product not found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        try {
            const result = await Product.findByIdAndUpdate(id, {
                name,
                price,
                stock,
                status
            }, { new: true });

            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).json({ error: 'Product not found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
});


module.exports = router