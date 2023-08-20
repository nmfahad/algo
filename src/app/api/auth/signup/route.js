import connect from "@/database/connect";
import Users from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect.connect();
  const reqBody = await req.json();
  const { name, email, username, password } = reqBody;
  const existingUser = await Users.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({
        message: "An account with this email or username already exists",
      });
  }
  const newUser = new Users({
    name,
    email,
    username,
    password,
  });
  await newUser.save();
  return NextResponse.json(
    { message: "Account created successfully!" },
    { status: 200 }
  );
}
// }
