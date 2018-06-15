const express = require('express');
const router = express.Router();

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', (req,res)=>{
    res.sendFile('index.html');
});

module.exports = router;