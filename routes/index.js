const route = require('express').Router();
const Controller = require('../controllers');
const { verifyToken } = require('../utils/encryption');

// Create a user
route.post('/user', Controller.createUser);

// Update status of user
route.put('/user', verifyToken, Controller.updateStatus);

// Get Destination Distance from user location
route.post('/distance', verifyToken, Controller.getDistance);

// Get users
route.get('/users', verifyToken, Controller.getUsers);



module.exports = route;