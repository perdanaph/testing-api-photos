const router = require('express').Router();
const authenticationMiddleware = require('../middlewares/authentication-middleware');
const PhotosController = require('../controllers/photos-controller');

router.use(authenticationMiddleware);
router.get('/', PhotosController.findAll);
router.get('/:id', PhotosController.findById);
router.post('/', PhotosController.create);
router.put('/:id', PhotosController.update);
router.delete('/:id', PhotosController.delete);

module.exports = router;
