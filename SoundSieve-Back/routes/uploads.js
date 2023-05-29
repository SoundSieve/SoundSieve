/* Uploads routing
 * Main route: '/api/v1/upload'
 */
// Imports
const { Router } = require('express');
// Controllers
const { upload, getFile } = require('../controllers/upload.controller')
const expressFileUpload = require('express-fileupload')
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use( expressFileUpload() );  

router.put('/:type/:id', [
    validateJWT
], upload);

router.get('/:type/:file', [
    validateJWT
], getFile);


module.exports = router