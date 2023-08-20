"use client"

import View_Questions from "@/components/qna/View_Questions";
import { useParams, useRouter } from "next/navigation";

export default function ViewQuestion() {
    const { question_id } = useParams();
    console.log(question_id)

    return (
        <View_Questions question_id={question_id} />
    );
}
