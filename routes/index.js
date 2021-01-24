const express = require('express');
const Artical = require('./article');
const users = require('./user');
const router = express.Router();
router.use('/users', users);
router.use('/article' , Artical);
module.exports={ router}