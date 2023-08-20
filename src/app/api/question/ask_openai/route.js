
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req, res) {
    const reqBody = await req.json();

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATIONS,
    });

    const openAIResponse = openai.chat.completions.create(
        {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: process.env.OPENAI_ROLE,
                    content: reqBody.content
                }
            ]
        }
    )

    const aiResponseMessage = (await openAIResponse).choices[0].message;

    return NextResponse.json(aiResponseMessage);
   
}
