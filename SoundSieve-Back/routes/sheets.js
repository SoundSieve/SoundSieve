/* Sheets routing
 * Main route: '/api/v1/sheets'
 */
// Imports
const { Router } = require("express");
// Controllers
const {
  getSheets,
  getSheetById,
  addSheet,
  updateSheet,
} = require("../controllers/sheets.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", [validateJWT], getSheets);

router.get("/:id", [validateJWT], getSheetById);

router.post(
  "/",
  [
    validateJWT,
    check("name", "The sheet name is mandatory").not().isEmpty(),
    check("year", "The year is mandatory").not().isEmpty(),
    check("year", "Must be a valid year")
      .isLength("4")
      .isBefore((new Date().getFullYear() + 1).toString()),
    validateFields,
  ],
  addSheet
);

router.put("/:id", [validateJWT], updateSheet);

module.exports = router;
