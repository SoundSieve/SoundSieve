/* Users routing
 * Main route: '/api/v1/users'
 */
// Imports
const { Router } = require('express');
// Controllers
const { getUsers, getUserById } = require('../controllers/users.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Get all users
router.get('/', [
    validateJWT
], getUsers);

// Get user by id
router.get('/:id', [
    validateJWT
], getUserById);

module.exports = router