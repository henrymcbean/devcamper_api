const express = require('express');

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advanceResults = require('../middleware/advanceResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advanceResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), createReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);
// .delete(protect, authorize('publisher', 'admin'), deleteCourse);

// router
//     .route('/:bootcampId/:id')
//     .put(protect, authorize('user', 'admin'), updateReview)

module.exports = router;
