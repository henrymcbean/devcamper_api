const express = require('express');

const {
  getReviews,
  getReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advanceResults = require('../middleware/advanceResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(advanceResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }), getReviews);

router.route('/:id')
.get(getReview);
// .put(protect, authorize('publisher', 'admin'), updateCourse)
// .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
