const express = require('express');
const router = express.Router()


router.get('/first', (req, res) => {
    res.json({ message: "first"});
});

module.exports = router;