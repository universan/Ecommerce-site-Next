import Stars from "@/components/product/Stars";
import RatingDistriibution from "@/components/product/RatingDistriibution";

export default function UserReviews({ reviews }) {
  return (
    <>
      {reviews?.length > 0 ? (
        <>
          <RatingDistriibution reviews={reviews} />

          <ul class="list-group mt-4 bg-white">
            {reviews?.map((review) => (
              <li key={review._id} class="list-group-item mb-1">
                <div>
                  <p>
                    <strong>{review?.postedBy?.name}</strong>
                  </p>
                  <Stars rating={review?.rating} />
                  {review?.comment && <p class="mt-3">{review.comment}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </>
  );
}
