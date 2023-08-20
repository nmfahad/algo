"use client";
import Editor from '@/components/editor/editor';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [editorLoadedQsn, setEditorQsnLoaded] = useState(false);
    const [editorLoadedExp, setEditorExpLoaded] = useState(false);
    const [dataQsn, setDataQsn] = useState("");
    const [dataExp, setDataExp] = useState("");
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");


    useEffect(() => {
        setEditorQsnLoaded(true);
    }, []);
    useEffect(() => {
        setEditorExpLoaded(true);
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
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

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // getting current date
    const currentDateTime = (new Date()).toLocaleString()
    const currentDate = currentDateTime.split(",").slice(0, 1).join("");
    console.log(currentDate)

    // question {
    // 	id
    // 	title
    // 	date
    // 	author:username
    // 	question_body
    // 	question_views
    // 	answers_count
    // 	category
    // 	tags
    // 	vote
    // }

    const handlePublish = async () => {
        const res = await fetch("/api/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: getRandomInt(1, 100000000),
                title: title,
                date: currentDate,
                author: user.username,
                question_body: dataQsn + dataExp,
                question_views: 0,
                answers_count: 0,
                category: category, // new
                tags: tag.split(","),
                vote: 0,
            }),
        });


        const resp = await res.json();
        if (resp.status === 200) {
            alert(resp.message);
        }
        else {
            alert(resp.message);
        }
    };

console.log(user)

// console.log(dataQsn)
// console.log(dataExp)
// console.log(title)
// console.log(tag)
// console.log(category)
return (
    <div className='h-full'>
        <main className="lg:col-span-12 xl:col-span-10 p-10">
            <div className="mt-0">
                <ul role="list" className="space-y-4">
                    {/* <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                    <h1 className="text-3xl">Ask a public question</h1>
                  </li> */}
                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <div>
                            <h1 className="mb-1 text-3xl font-bold">
                                Ask a public question
                            </h1>
                            <h2 className="text-xl ">
                                Steps of writing a good question
                            </h2>
                            <ul className="list-disc ml-8">
                                <li>Summarize your problem in a one-line title.</li>
                                <li>Describe your problem in more detail.</li>
                                <li>
                                    Describe what you tried and what you expected to
                                    happen.
                                </li>
                                <li>
                                    Add “tags” which help surface your question to members
                                    of the community.
                                </li>
                                <li>Review your question and post it to the site.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <p
                                className="mb-2 text-sm text-gray-500"
                                id="email-description"
                            >
                                Be specific and imagine you’re asking a question to
                                another person.
                            </p>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g. Is there an R function for finding the index of an element of a vector?"
                                    aria-describedby="title-description"
                                />
                            </div>
                        </div>
                    </li>
                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700"
                        >
                            What are the details of your problem?
                        </label>
                        <p
                            className="mb-2 text-sm text-gray-500"
                            id="email-description"
                        >
                            Introduce the problem and expand on what you put in the
                            title. Minimum 20 characters.
                        </p>

                        <Editor
                            name="description"
                            onChange={(dataQsn) => {
                                setDataQsn(dataQsn);
                            }}
                            editorLoaded={editorLoadedQsn}
                        />

                        {/* {JSON.stringify(dataQsn)} */}
                    </li>
                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-700"
                        >
                            What did you try and what were you expecting?
                        </label>
                        <p
                            className="mb-2 text-sm text-gray-500"
                            id="email-description"
                        >
                            Describe what you tried, what you expected to happen, and
                            what actually resulted. Minimum 20 characters.
                        </p>

                        <Editor
                            name="description"
                            onChange={(dataExp) => {
                                setDataExp(dataExp);
                            }}
                            editorLoaded={editorLoadedExp}
                        />

                        {/* {JSON.stringify(dataExp)} */}
                    </li>
                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Tags
                            </label>
                            <p
                                className="mb-2 text-sm text-gray-500"
                                id="tag-description"
                            >
                                Add up to 5 tags to describe what your question is
                                about. Tags should be separated by comma.
                            </p>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="tag"
                                    id="tag"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g. react, javascript, typescript, python"
                                    aria-describedby="tag-description"
                                />
                            </div>
                        </div>
                    </li>

                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <p
                                className="mb-2 text-sm text-gray-500"
                                id="tag-description"
                            >
                                Add your question category
                            </p>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    aria-describedby="category-description"
                                />
                            </div>
                        </div>
                    </li>

                    <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                        <Link href="/">
                            <button
                                type="button"
                                onClick={handlePublish}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Publish
                            </button>
                        </Link>
                        <Link href="/">
                            <button

                                type="button"
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                            >
                                Discard
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </main>
    </div>
)
}

export default page