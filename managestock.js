const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 2000;
const cors = require('cors');
const bearerToken = require('express-bearer-token');


app.use(bodyParser());
app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended : false}))
app.use(cors()); // npm i cors

const {
    filterRouter,
    stockRouter
} = require('./router');

app.use('/filter', filterRouter);
app.use('/stock', stockRouter);

app.listen(port, () => console.log(`API active at port ${port}`));