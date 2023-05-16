/* Search routing */
// Imports
const { Router } = require('express');
// Controllers
const {  } = require('../controllers/search.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// FindAll
router.get('/sheets', [
], findAll)

module.exports = router