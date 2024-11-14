const express  = require('express');
const path = require('path');
const app = express()
// const productRouter = require('./app/product/routes')
// const productRouterv2 = require('./app/productV2/routes')
const productRouterv3 = require ('./app/productv3/routes')
const productRouterv4 = require ('./app/productV4/routes')
require ('./config/mongose')
const logger = require ('morgan')
const cors = require('cors')

const port = process.env.PORT || 3000;

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public',express.static(path.join(__dirname, 'uploads')));
// app.use('/api/v1', productRouter)
// app.use('/api/v2', productRouterv2)
app.use('/api/v3', productRouterv3)
app.use('/api/v4', productRouterv4)


app.use((req, res, next) => {
    res.status(404); 
    res.send({
        status: "failed",
        message: 'resource' + req.originalUrl + 'not found'
    })
})



app.listen(port, () => console.log(`Server: http://localhost:${port} `))