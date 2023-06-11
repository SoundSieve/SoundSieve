/* Uploads routing
 * Main route: '/api/v1/upload'
 */
// Imports
const { Router } = require("express");
// Controllers
const {
  uploadImage,
  getImage,
  uploadPdf,
  getPdf,
} = require("../controllers/upload.controller");
const expressFileUpload = require("express-fileupload");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.use(expressFileUpload());

router.put("/image/:type/:id", [validateJWT], uploadImage);
router.put("/pdf/:type/:id", [validateJWT], uploadPdf);

router.get("/image/:type/:image", getImage);
router.get("/pdf/:type/:pdf", getPdf);

module.exports = router;
