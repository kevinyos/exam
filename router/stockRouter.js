const express = require('express');
const router = express.Router();
const { stockController } = require('../controller');
const {
    getStock,
    addStock,
    editStock,
    deleteStock
} = stockController;

router.get('/getstock/:id', getStock);
router.post('/addstock/:id', addStock);
router.post('/editstock/:id', editStock);
router.delete('/deletestock/:id', deleteStock);

module.exports = router;