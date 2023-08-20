import connect from "@/database/connect";
import Blogs from "@/models/blog";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();

    try {
        const reqBody = await req.json();
        const { blog_id, body, authorUsername, authorImageUrl } = reqBody;

        // Find the blog post using its ID
        const blog = await Blogs.findById(blog_id);

        if (!blog) {
            return new NextResponse.json({ message: 'blog not found' }, { status: 404 });
        }

        const newComment = {
            authorUsername: authorUsername,
            authorImageUrl: authorImageUrl,
            body: body,
        };

        blog.comment_list.push(newComment);
        blog.comment_count++;
        await blog.save();

        return new NextResponse.json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        return new NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
