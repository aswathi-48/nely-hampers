import Review from '../models/Review.js';

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews (including unapproved)
// @route   GET /api/reviews/admin
// @access  Private/Admin
export const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (or Public depending on requirements, let's use Private for logged-in customers)
export const createReview = async (req, res) => {
  try {
    const { rating, review, image } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Must be logged in to review' });
    }

    const newReview = new Review({
      customer: req.user._id,
      customerName: req.user.name,
      rating: Number(rating),
      review,
      image,
      isApproved: false // Requires admin approval
    });

    const createdReview = await newReview.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a review
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
export const approveReview = async (req, res) => {
  try {
    const reviewItem = await Review.findById(req.params.id);

    if (reviewItem) {
      reviewItem.isApproved = true;
      const updatedReview = await reviewItem.save();
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Hide a review
// @route   PUT /api/reviews/:id/hide
// @access  Private/Admin
export const hideReview = async (req, res) => {
  try {
    const reviewItem = await Review.findById(req.params.id);

    if (reviewItem) {
      reviewItem.isApproved = false;
      const updatedReview = await reviewItem.save();
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const reviewItem = await Review.findById(req.params.id);

    if (reviewItem) {
      await reviewItem.deleteOne();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


