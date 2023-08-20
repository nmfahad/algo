import connect from "@/database/connect";
import Questions from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();
    const { question_id, todo } = await req.json();
    if (todo === "upvote") {
        const questions = await Questions.findOneAndUpdate(
            { _id: question_id },
            { $inc: { vote: 1 } }
        );
        if (questions) {
            return NextResponse.json({ message: "Vote updated" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Something went wrong" }, { status: 409 });
        }
    } else if (todo === "downvote") {
        const questions = await Questions.findOneAndUpdate(
            { _id: question_id },
            { $inc: { vote: -1 } }
        );
        if (questions) {
            return NextResponse.json({ message: "Vote updated" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Something went wrong" }, { status: 409 });
        }
    }
}
