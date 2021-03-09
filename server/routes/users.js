const express=require('express');
const router=express.Router();


const { signUp, signIn,tokenIsValid }=require('../controllers/user');

//for registering a new user
router.post("/signup",signUp);

//for logging in a user
router.post("/signin",signIn);

//for checking if the token stored in local storage is a valid token
router.post('/tokenIsValid', tokenIsValid)




module.exports = router; 
