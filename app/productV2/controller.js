const fs = require('fs');
const path = require('path');
const Product = require ('./model');


const addProduct = async (req, res) => {
    const {user_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
    }
    try {
        await Product.sync();
        const result = await Product.create({user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
        res.send(result)
    } catch (err) {
        res.send(err);
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findAll(req.params);
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
    }
};

const updateProduct = async (req, res) => {
    const {user_id, name, price, stock, status} = req.body;
    const image = req.file;
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            return res.status(404).json({message: 'Product not found'})
        } 
        if (image) {
            await product.update({
                user_id,
                name,
                price,
                stock,
                status,
                image_url: `http://localhost:3000/public/${image.originalname}`
            });
        } else {
            await product.update({
                user_id,
                name,
                price,
                stock,
                status
            })
        }
        res.status(200).json({message: 'Product updated successfully',data:product})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Product not found'})
        
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({where:{id: req.params.id}});
        if (!product) {
            return res.status(404).json({message: 'id is not valid'})
        }
        res.status(200).json({message: 'delete succes'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        
    }
};



module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct

}