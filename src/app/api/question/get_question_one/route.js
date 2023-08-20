import connect from "@/database/connect";
import Questions from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();
    const reqBody = await req.json();
    const { question_id } = reqBody;
    const question = await Questions.findOne({ _id: question_id });
    if (question) {
        return NextResponse.json(question);
    } else {
        return NextResponse.json({ message: "Something went wrong" });
    }
}
