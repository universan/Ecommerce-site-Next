export function calculateAverageRating(ratings) {
  let totalRating = 0;

  for (const ratingObj of ratings) {
    totalRating += ratingObj.rating;
  }

  const averageRating = totalRating / ratings.length;
  return averageRating;
}
