const router = require ('express').Router();
const multer = require('multer');
const upload = multer ({dest: "uploads"})
const { addProduct, getProduct, updateProduct, deleteProduct } = require ('./controller')



router.post('/product', upload.single('image'), addProduct);
router.get('/product', getProduct)
router.put('/product/:id', upload.single('image'), updateProduct);
router.delete('/product/:id', deleteProduct );



module.exports = router;