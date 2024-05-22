import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  // console.log("body => ", body);

  const { name, parentCategory } = body;

  try {
    const tag = await Tag.create({ name, parentCategory, slug: slugify(name) });
    return NextResponse.json(tag);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
