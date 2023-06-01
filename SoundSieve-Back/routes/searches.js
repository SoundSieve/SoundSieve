/* Searches routing
 * Main route: '/api/v1/search'
 */
// Imports
const { Router } = require("express");
// Controllers
const {
  searchAll,
  searchCollection,
} = require("../controllers/search.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/all/:search", searchAll);

router.get("/collection/:table/:search", searchCollection);

module.exports = router;
