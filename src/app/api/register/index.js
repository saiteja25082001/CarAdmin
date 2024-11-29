// my-nextjs-backend/pages/api/register/index.js
import dbConnect from "../../../utils/config/db";
import UserModel from "../../../utils/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  const { username, email, password } = await request.json();

  try {
    const user = new UserModel({ username, email, password });
    await user.save();
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 400 });
  }
}
