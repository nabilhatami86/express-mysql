const { error } = require('console');
const db = require ('../../config/mongo')
const fs = require('fs');
const { ObjectId } = require('mongodb');
const path = require('path');

const index = (req, res) => {
    db.collection('products').find()
    .toArray()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({message: err.message}))
}
const view = (req, res) => {
    const { id } = req.params;

    db.collection('products').findOne({ _id:  new ObjectId(id) })
        .then(result => res.send(result))
        .catch(error => res.send(error));
};
const store = (req, res) => {
    const {name, user_id, price, stock, status} = req.body
    const image = req.file;
        if(image){
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target)

        db.collection('products').insertOne({ name, price, stock, status,image_url: `http://localhost:3000/public/${image.originalname}` })
        .then(result => res.send(result))
        .catch(error => res.send(error));
        }

    
};




module.exports = {
    index,
    view,
    store

};