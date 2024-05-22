import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { name, email, password } = body;

  try {
    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();

    // console.log("user created => ", user);
    return NextResponse.json({ success: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
