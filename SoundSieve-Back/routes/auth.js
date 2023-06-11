/** 
 * Auth routing
 * Main route: '/api/v1/auth'
 */
// Imports
const { Router } = require('express');
// Controllers
const { newUser, loginUser, googleSignIn, renew } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// New user
router.post('/new', [
    check('email', 'The email is mandatory').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    check('firstName', 'The first name is mandatory').not().isEmpty(),
    check('lastName', 'The last name is mandatory').not().isEmpty(),
    validateFields
], newUser)

// Login user
router.post('/login', [
    check('email', 'The email is mandatory').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6}),
    validateFields
] , loginUser);

// Login Google
router.post('/login/google', [
    check('token', 'The google token is mandatory').not().isEmpty(),
    validateFields
] , googleSignIn);

// Renew token
router.get('/renew', [
    validateJWT
], renew);

module.exports = router