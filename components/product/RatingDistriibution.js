import { FaStar, FaRegStar } from "react-icons/fa";
import { calculateAverageRating } from "@/utils/helpers";
import Stars from "@/components/product/Stars";

export default function RatingDistriibution({ reviews }) {
  // calculate rating distrucution and total number of reviews
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  let totalReviews = 0;

  reviews.forEach((review) => {
    distribution[review.rating] += 1;
    totalReviews++;
  });

  // Calculate percentage and generate rating icons
  const ratingIcons = Object.keys(distribution).map((rating) => {
    const count = distribution[rating]; // how maany reviews
    let percentage = ((count / totalReviews) * 100).toFixed(2);
    percentage =
      parseFloat(percentage) === parseInt(percentage)
        ? parseInt(percentage)
        : percentage;

    const starIcons = Array.from({ length: parseInt(rating) }, (_, index) => (
      <FaStar key={index} className="text-danger" />
    ));
    const emptyStarIcons = Array.from(
      { length: 5 - parseInt(rating) },
      (_, index) => <FaRegStar key={index} />
    );

    return (
      <div
        key={rating}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="progress col-6 p-0 m-0 mt-1" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-secondary"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div className="col-6">
          {starIcons} {emptyStarIcons} {percentage}%
        </div>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="col-3 d-flex align-items-center">
        <div className="text-center">
          <p className="display-2 mb-0">
            <strong>{calculateAverageRating(reviews)?.toFixed(1)}</strong>
          </p>
          <Stars rating={calculateAverageRating(reviews)} />
          <p>Product Ratings</p>
        </div>
      </div>
      <div className="col-9">{ratingIcons?.reverse()}</div>
    </div>
  );
}
