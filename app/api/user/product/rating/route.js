import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
// import Order from '@/models/Order'
import { currentUser } from "@/utils/currentUser";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  console.log("req body in rating => ", body);
  const { productId, rating, comment } = body;
  const user = await currentUser(req);

  try {
    const product = await Product.findById(productId);
    // check if user has already left a rating
    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === user._id.toString()
    );

    // check if the user has purchased the product

    if (existingRating) {
      // update the existing rating
      existingRating.rating = rating;
      existingRating.comment = comment;
      await product.save();

      return NextResponse.json(product);
    }

    // if the user has not already rated, add a new rating
    product.ratings.push({
      rating,
      comment,
      postedBy: user._id,
    });

    const updated = await product.save();

    return NextResponse.json(updated);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again later" },
      { status: 500 }
    );
  }
}
