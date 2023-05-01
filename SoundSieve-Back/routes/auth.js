/* Auth routing */
// Imports
const { Router } = require('express');
// Controllers
const { newUser, loginUser, renew } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { strongPasswordOptions } = require('./routes.interface');
const { validateFields } = require('../middlewares/validate-fields');

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

// Renew token
router.get('/renew', renew);

module.exports = router