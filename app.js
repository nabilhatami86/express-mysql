const express  = require('express');
const path = require('path');
const app = express()
const productRouter = require('./app/product/routes')
const productRouterv2 = require('./app/productV2/routes')
const logger = require ('morgan')

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter)
app.use('/api/v2', productRouterv2)


app.use((req, res, next) => {
    res.status(404); 
    res.send({
        status: "failed",
        message: 'resource' + req.originalUrl+ 'not found'
    })
})



app.listen(port, () => console.log(`Server: http://localhost:${port} `))