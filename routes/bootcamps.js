const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const advanceResults = require('../middleware/advanceResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource router - will call course route '/'
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router.route('/')
  .get(advanceResults(Bootcamp, 'course'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);      // Note even though the bootcampId is passed in url
                                                                        // we are still using the '/' as route for the POST
router.route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;