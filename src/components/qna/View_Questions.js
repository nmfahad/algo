
"use client"
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
    EllipsisVerticalIcon, FlagIcon, StarIcon,
} from "@heroicons/react/20/solid";

import { BsFillCaretDownFill as Downvote } from "react-icons/bs";
import { BsFillCaretUpFill as Upvote } from "react-icons/bs";

import { Button } from "@mui/material";
import Image from "next/image";
import Editor from "../../components/editor/editor";
import Link from "next/link";
import Individual_Comment from "../Individual_Comment";
import View_Single_Question from "./View_Single_Question";



export default function View_Questions({ question_id }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [editorData, setEditorData] = useState("");
    const [comment_body, setCommentBody] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [voteUpdate, setVoteUpdate] = useState(null);

    // getting loggedInUser from local Storage --> 
    useEffect(() => {
        const usr = localStorage.getItem("loggedInUser");
        if (usr) {
            setIsLoggedIn(true);
            setUser(JSON.parse(usr));
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    // Getting clicked question --> 
    const fetchedSelectedQuestion = async () => {
        const res = await fetch("/api/question/get_question_one", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question_id: question_id,
            }),
        });
        const data = await res.json();
        if (res.status === 200) {
            setQuestion(data);
        }
    };
    useEffect(() => {
        fetchedSelectedQuestion();
    }, [question_id])




    // undone getting answer
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/answer/get_answers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: question_id,
                }),
            });
            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                setAnswers(data);
            }
        };
        fetchData();
    }, [question_id]);

    const addAnswer = async () => {
        const res = await fetch("/api/answer/add_answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: editorData,
                _id: question_id,
                author: user.name,
                authorImageUrl: user.imageUrl,
                authorUsername: user.username,
            }),
        });
        const resp = await res.json();



        fetchData2();
        window.location.reload();
    };
    const [comments, setComments] = useState(null);

    // ADDING NEW COMMENT --> 
    const addComment = async () => {
        const res = await fetch("/api/comment/add_comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: comment_body,
                question_id: question_id,
                authorImageUrl: (user.imageUrl) ? user.imageUrl : '/images/default.jpg',
                authorUsername: (user.username) ? user.username : 'guest-user',
            }),
        });
        const resp = await res.json();
    };





    return (
        <>
            <div className="min-h-full">
                <div className="py-10">
                    <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
                        <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                            <nav
                                aria-label="Sidebar"
                                className="sticky top-4 divide-y divide-gray-300"
                            >
                                <div className="pt-10 pb-5">
                                    <p
                                        className="px-3 text-sm font-medium text-gray-500"
                                        id="communities-headline"
                                    >
                                        Popular Categories
                                    </p>
                                </div>
                                <div className="pt-10">
                                    <p
                                        className="px-3 text-sm font-medium text-gray-500"
                                        id="communities-headline"
                                    >
                                        Quick Links
                                    </p>
                                </div>
                            </nav>
                        </div>
                        <main className="lg:col-span-9 xl:col-span-7">
                            <div className="mt-0">
                                <ul role="list" className="space-y-4">
                                    {question && (
                                        <View_Single_Question
                                            question={question}
                                            question_id={question_id}
                                            fetchedSelectedQuestion={fetchedSelectedQuestion}
                                        />
                                    )}
                                </ul>
                            </div>
                            {/* COMMENT SECTIONS */}
                            <div className="space-y-6 mt-2">
                                <section aria-labelledby="notes-title">
                                    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                                        <div className="divide-y divide-gray-200">
                                            <div className="px-4 py-5 sm:px-6">
                                                <h2
                                                    id="notes-title"
                                                    className="text-lg font-medium text-gray-900"
                                                >
                                                    Comments
                                                </h2>
                                            </div>
                                            <div className="px-4 py-6 sm:px-6">
                                                <ul role="list" className="space-y-5">
                                                    {question?.comment_list && question?.comment_list.map((comment) =>
                                                        <Individual_Comment key={comment._id} comment={comment} />
                                                    )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                            {isLoggedIn ? (<div className="flex space-x-3">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        height={100}
                                                        width={100}
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.imageUrl}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <form action="#">
                                                        <div>
                                                            <label htmlFor="comment" className="sr-only">
                                                                About
                                                            </label>
                                                            <textarea
                                                                id="comment"
                                                                name="comment"
                                                                rows={3}
                                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                                placeholder="Add a comment"
                                                                value={comment_body}
                                                                onChange={(e) => setCommentBody(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <a
                                                                href="#"
                                                                className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900"
                                                            >
                                                            </a>
                                                            <button
                                                                type="submit"
                                                                onClick={addComment}
                                                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                            >
                                                                Comment
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>) : (<Link href="/auth/login">Login to add comment</Link>)}

                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg mt-4">
                                <div className="divide-y divide-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2
                                            id="notes-title"
                                            className="text-lg font-medium text-gray-900"
                                        >
                                            {/* {answers.length + " "}Answers */}
                                            Answers
                                        </h2>
                                    </div>
                                    {/* <h1 className="sr-only">Recent questions</h1> */}
                                    <ul role="list" className="space-y-2">
                                        {answers && answers.map((answer) => (
                                            <li
                                                key={answer._id}
                                                className="bg-white px-4 shadow  sm:p-6"
                                            >
                                                <article aria-labelledby={"answer-title-" + answer._id}>
                                                    <div>
                                                        <div className="flex space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <Image
                                                                    className="h-10 w-10 rounded-full"
                                                                    src={answer.authorImageUrl}
                                                                    height={1000}
                                                                    width={1000}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    <Link
                                                                        href={"/profile/" + answer.authorUsername}
                                                                        className="hover:underline"
                                                                    >
                                                                        {answer.author}
                                                                    </Link>
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    <Link
                                                                        href="#"
                                                                        className="hover:underline"
                                                                    >
                                                                        <time dateTime={answer.date}>
                                                                            {getDate(answer.date)}
                                                                        </time>
                                                                    </Link>
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-shrink-0 self-center">
                                                                <Menu
                                                                    as="div"
                                                                    className="relative inline-block text-left"
                                                                >
                                                                    <div>
                                                                        <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                                                            <span className="sr-only">
                                                                                Open options
                                                                            </span>
                                                                            <EllipsisVerticalIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </Menu.Button>
                                                                    </div>

                                                                    <Transition
                                                                        as={Fragment}
                                                                        enter="transition ease-out duration-100"
                                                                        enterFrom="transform opacity-0 scale-95"
                                                                        enterTo="transform opacity-100 scale-100"
                                                                        leave="transition ease-in duration-75"
                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                        leaveTo="transform opacity-0 scale-95"
                                                                    >
                                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <a
                                                                                            href="#"
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? "bg-gray-100 text-gray-900"
                                                                                                    : "text-gray-700",
                                                                                                "flex px-4 py-2 text-sm"
                                                                                            )}
                                                                                        >
                                                                                            <StarIcon
                                                                                                className="mr-3 h-5 w-5 text-gray-400"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                            <span>Save</span>
                                                                                        </a>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <a
                                                                                            href="#"
                                                                                            className={classNames(
                                                                                                active
                                                                                                    ? "bg-gray-100 text-gray-900"
                                                                                                    : "text-gray-700",
                                                                                                "flex px-4 py-2 text-sm"
                                                                                            )}
                                                                                        >
                                                                                            <FlagIcon
                                                                                                className="mr-3 h-5 w-5 text-gray-400"
                                                                                                aria-hidden="true"
                                                                                            />
                                                                                            <span>Report</span>
                                                                                        </a>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Transition>
                                                                </Menu>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-12">
                                                            <div className="col-span-1 text-gray-400">
                                                                <Upvote
                                                                    className="h-9 w-9 mt-2 hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                    onClick={() => increaseVoteAnswer(answer.authorUsername)}
                                                                />
                                                                <h1 className="font-medium text-lg text-gray-900 ml-3">
                                                                    {answer.vote}
                                                                </h1>
                                                                <Downvote
                                                                    className="h-9 w-9 hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                    onClick={() => decreaseVoteAnswer(answer.authorUsername)}
                                                                />
                                                            </div>
                                                            <div className="col-span-11">
                                                                <div></div>
                                                                <div
                                                                    className="mt-2 space-y-4 text-base text-gray-700 text-justify"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: answer.body,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </li>
                                        ))}
                                        <div className="bg-white px-4  sm:p-6">
                                            <h1 className="mb-2 text-2xl font-medium text-gray-700">
                                                {" "}
                                                Add Your Answer Here
                                            </h1>
                                            <Editor
                                                name="description"
                                                onChange={(data) => {
                                                    setEditorData(data);
                                                }}
                                                editorLoaded={editorLoaded}
                                            />

                                            {/* {JSON.stringify(data)} */}
                                            {isLoggedIn &&
                                                <Button variant="outlined" size="medium" className="mt-2" onClick={addAnswer}>
                                                    Post Your Answer
                                                </Button>

                                            }
                                        </div>

                                        <div className="bg-white px-4 mb-2 shadow">
                                            {!isLoggedIn && <div><h1 className="mb-2 text-xl font-medium text-gray-700">
                                                {" "}
                                                You need to login to post your answer
                                            </h1>
                                                <Link href="/auth/login"><Button variant="outlined" size="medium" className="mt-2">
                                                    Login or Signup
                                                </Button></Link> </div>}
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </main>
                        <aside className="hidden xl:col-span-3 xl:block">
                            <div className="sticky top-4 space-y-4">
                                <section aria-labelledby="who-to-follow-heading">
                                    <div className="rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            <h2
                                                id="who-to-follow-heading"
                                                className="text-base font-medium text-gray-900"
                                            >
                                                Top Users
                                            </h2>
                                            <div className="mt-6">
                                                <Link
                                                    href="/users"
                                                    className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                                >
                                                    View all
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
