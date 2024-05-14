"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useProduct } from "@/context/product";
import Stars from "@/components/product/Stars";
import { calculateAverageRating } from "@/utils/helpers";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ProductRating({ product, leaveARating = true }) {
  const {
    showRatingModal,
    setShowRatingModal,
    currentRating,
    setCurrentRating,
    comment,
    setComment,
  } = useProduct();

  const [productRatings, setProductRatings] = useState(product?.ratings || []);
  const [averageRating, setAverageRating] = useState(0);

  // current user
  const { data, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const alreadyRated = productRatings?.find(
    (rate) => rate?.postedBy?._id === data?.user?._id
  );

  useEffect(() => {
    if (alreadyRated) {
      setCurrentRating(alreadyRated?.rating);
      setComment(alreadyRated?.comment);
    } else {
      setCurrentRating(0);
      setComment("");
    }
  }, [alreadyRated]);

  useEffect(() => {
    if (productRatings) {
      const average = calculateAverageRating(productRatings);
      setAverageRating(average);
    }
  }, [product?.ratings]);

  const submitRating = async () => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to leave a rating");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    try {
      const response = await fetch(`${process.env.API}/user/product/rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product?._id,
          rating: currentRating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to leave a rating");
      }

      const data = await response.json();
      setProductRatings(data?.ratings);
      setShowRatingModal(false);
      toast.success("Thanks for leaving a rating");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Error leaving a rating");
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <div>
        <Stars rating={averageRating} />
        <small className="text-muted"> ({productRatings?.length})</small>
      </div>

      {leaveARating && (
        <small onClick={() => setShowRatingModal(true)} className="pointer">
          {alreadyRated ? "Update your rating" : "Leave a rating"}
        </small>
      )}

      {showRatingModal && (
        <Modal>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Write a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="pointer">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={ratingValue}
                  className={
                    ratingValue <= currentRating ? "star-active lead" : "lead"
                  }
                  onClick={() => setCurrentRating(ratingValue)}
                >
                  {ratingValue <= currentRating ? (
                    <FaStar className="text-danger" />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              );
            })}
          </div>

          <button
            onClick={submitRating}
            className="btn btn-primary btn-raised my-3"
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
}
