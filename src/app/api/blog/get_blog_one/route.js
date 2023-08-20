import connect from "@/database/connect";
import Blogs from "@/models/blog";

import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();
    const reqBody = await req.json();
    const { post_id } = reqBody;
    const blog = await Blogs.findOne({ _id: post_id });
    if (blog) {
        return NextResponse.json(blog);
    } else {
        return NextResponse.json({ message: "Something went wrong" });
    }
}
