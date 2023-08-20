import connect from "@/database/connect";
import Questions from "@/models/questions";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    await connect.connect();
    const reqBody = await req.json();
    const newQuestion = new Questions(reqBody);
    await newQuestion.save();
    const questions = await Questions.find();
    if (questions) {
        return NextResponse.json({ message: "Question added successfully" });
    } else {
        return NextResponse.json({ message: "Something went wrong" });
    }
}

export async function GET(req, res) {
    if (req.method === "GET") {
      await connect.connect();
      const questions = await Questions.find();
      if (questions) {
        return NextResponse.json(questions.reverse());
      } else {
        return NextResponse.json({ message: "Something went wrong" });
      }
    }
  }
  