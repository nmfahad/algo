// create apis for learning platform

// merge
import connect from "@/database/connect";
import Blogs from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();
    const reqBody = await req.json();
    const newBlog = new Blogs(reqBody);
    await newBlog.save();
    const blogs = await Blogs.find();
    if (blogs) {
        return NextResponse.json({ message: "Blog added successfully" });
    } else {
        return NextResponse.json({ message: "Something went wrong" });
    }
}

export async function GET(req, res) {
    if (req.method === "GET") {
      await connect.connect();
      const blogs = await Blogs.find();
      if (blogs) {
        return NextResponse.json(blogs);
      } else {
        return NextResponse.json({ message: "Something went wrong" });
      }
    }
  }
  