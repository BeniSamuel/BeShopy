import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2026-02-20',
      comment: 'Absolutely love this! The quality is amazing and it fits perfectly. Highly recommend!',
      helpful: 12
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      date: '2026-02-18',
      comment: 'Great product overall. The material is good quality. Only minor issue is the sizing runs a bit small.',
      helpful: 8
    },
    {
      id: 3,
      name: 'Emma Williams',
      rating: 5,
      date: '2026-02-15',
      comment: 'Exceeded my expectations! Fast shipping and the product looks exactly like the pictures.',
      helpful: 15
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#224F34] font-poppins mb-8">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#224F34] font-poppins mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 font-poppins">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-poppins font-semibold text-lg text-[#224F34] mb-4">
              Rating Distribution
            </h3>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4 mb-3">
                <span className="font-poppins text-sm w-12">{rating} ★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#224F34] h-3 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="font-poppins text-sm text-gray-600 w-12">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-[#224F34] text-white px-6 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-[#224F34] font-poppins mb-4">
              Write Your Review
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-[#224F34] font-poppins mb-2">Your Name *</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#224F34] font-poppins mb-2">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className={`text-3xl transition-colors ${
                        rating <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#224F34] font-poppins mb-2">Your Review *</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md outline-none font-poppins focus:border-[#224F34]"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-[#224F34] text-white px-6 py-3 rounded-md font-poppins hover:bg-[#1a3d28] transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-poppins font-semibold text-lg text-[#224F34]">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-poppins">
                      {new Date(review.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 font-poppins mb-4">
                {review.comment}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-[#224F34] transition-colors">
                  <span>👍</span>
                  <span className="font-poppins">Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
