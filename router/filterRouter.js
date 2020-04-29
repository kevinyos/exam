const express = require('express');
const router = express.Router();
const { filterController } = require('../controller');
const {
    filterNama,
    filterBranch,
    filterStock
} = filterController;

router.get('/filternama/:nama', filterNama);
router.get('/filterbranch/:branch_name', filterBranch);
router.get('/filterstock/:inventory', filterStock);

module.exports = router;