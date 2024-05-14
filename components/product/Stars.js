import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Stars({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-danger" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className="text-danger" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-secondary" />);
    }
  }

  return <>{stars}</>;
}
