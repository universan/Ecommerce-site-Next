import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();
  const { name } = body;

  try {
    const updatingTag = await Tag.findByIdAndUpdate(
      context.params.id,
      {
        ...body,
        slug: slugify(name),
      },
      { new: true }
    );
    return NextResponse.json(updatingTag);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  try {
    const deletingTag = await Tag.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletingTag);
  } catch (err) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
