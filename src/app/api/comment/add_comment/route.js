import connect from "@/database/connect";
import Questions from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();

    try {
        const reqBody = await req.json();
        const { question_id, body, authorUsername, authorImageUrl } = reqBody;

        // Find the question post using its ID
        const question = await Questions.findById(question_id);

        if (!question) {
            return new NextResponse.json({ message: 'Question not found' }, { status: 404 });
        }

        const newComment = {
            authorUsername: authorUsername,
            authorImageUrl: authorImageUrl,
            body: body,
        };

        question.comment_list.push(newComment);
        await question.save();

        return new NextResponse.json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        return new NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
