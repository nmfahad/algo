'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsFillCaretDownFill as Downvote } from "react-icons/bs";
import { BsFillCaretUpFill as Upvote } from "react-icons/bs";
import Ask_AI from './Ask_AI';

const View_Single_Question = ({ question, question_id, fetchedSelectedQuestion }) => {
    const [voteUpdate, setVoteUpdate] = useState(null);

    useEffect(() => {
        fetchedSelectedQuestion();
        setVoteUpdate(null);
    }, [voteUpdate])
    // Converting date --> 
    function getDate(datetime) {
        const date = new Date(parseInt(datetime));
        const options = {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }

    // Increasing Vote -->
    const increaseVote = async () => {
        const res = await fetch("/api/question/update_question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question_id: question_id,
                todo: "upvote",
            }),
        });
        const data = await res.json();
        setVoteUpdate(data);
    };
    // Decreasing Vote -->
    const decreaseVote = async () => {
        const res = await fetch("/api/question/update_question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question_id: question_id,
                todo: "downvote",
            }),
        });
        const data = await res.json();
        setVoteUpdate(data);
    };

    return (
        <li
            key={question._id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
        >
            <article
                aria-labelledby={"question-title-" + question._id}
            >
                <div className='flex justify-between'>
                    <div className=''>
                        <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                                <Image
                                    className="h-10 w-10 rounded-full"
                                    src={question.authorImageUrl || '/images/default.jpg'}
                                    height={1000}
                                    width={1000}
                                    alt=""
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {question.author}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <a
                                        href={question.href}
                                        className="hover:underline"
                                    >
                                        <time dateTime={question.date}>
                                            {getDate(question.date)}
                                        </time>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-1 text-gray-400">
                                <Upvote
                                    className="h-9 w-9 mt-8 hover:text-gray-500"
                                    aria-hidden="true"
                                    onClick={increaseVote}
                                />
                                <h1 className="font-medium text-lg text-gray-900 ml-3">
                                    {question.vote}
                                </h1>
                                <Downvote
                                    className="h-9 w-9 hover:text-gray-500"
                                    aria-hidden="true"
                                    onClick={decreaseVote}
                                />
                            </div>
                            <div className="col-span-11">
                                <div>
                                    <h2
                                        id={"question-title-" + question._id}
                                        className="mt-4 text-lg font-medium text-gray-900"
                                    >
                                        {question.title}
                                    </h2>
                                </div>
                                <div
                                    className="mt-2 space-y-4 text-base text-gray-700 text-justify"
                                    dangerouslySetInnerHTML={{
                                        __html: (question.question_body) ? (question.question_body) : (question.body),
                                    }}
                                />

                                <div className="mt-2 flex justify-between items-center space-x-2">
                                    <div>
                                        {question?.tags?.map((tag, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="inline-flex gap-1 items-center rounded-sm border border-gray-500 bg-white px-1 py-0.5 text-sm font-normal text-gray-500 hover:bg-blue-600 indigo-500 hover:text-white focus:outline-none"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                    <p className=" text-sm text-gray-500">
                                        <span className=" font-bold text-black">Category: </span>
                                        {question.category}
                                    </p>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* OPEN-AI SECTION */}
                    <Ask_AI question={question} />
                </div>
            </article>
        </li>
    )
}

export default View_Single_Question