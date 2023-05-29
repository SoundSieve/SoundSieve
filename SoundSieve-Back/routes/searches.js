/* Searches routing
 * Main route: '/api/v1/search'
 */
// Imports
const { Router } = require('express');
// Controllers
const { searchAll,searchUsers } = require('../controllers/search.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', [
    validateJWT
], searchAll);

router.get('/collection/:table', [
    validateJWT
], searchUsers);

module.exports = router