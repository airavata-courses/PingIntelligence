const express = require('express')
const router = express.Router();

// const config = require("../config")
// module.exports = router

// var login = config.login
router.get("/",(req,res) => {
    console.log("hello")
    res.send("hello")
})

module.exports = router