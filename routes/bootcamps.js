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
const advanceResults = require('../middleware/advanceResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource router - will call course route '/'
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/')
  .get(advanceResults(Bootcamp, 'course'), getBootcamps)
  .post(createBootcamp);      // Note even though the bootcampId is passed in url
                              // we are still using the '/' as route for the POST
router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;