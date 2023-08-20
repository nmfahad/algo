import connect from "@/database/connect";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect.connect();
  const reqBody = await req.json();
  const {email, password} = reqBody;
  const existingUser = await Users.findOne({email:email , password:password});
  if (existingUser) {
    return NextResponse.json(existingUser, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid username or password"});
  }
}