'use client'
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";



import { BsFillCaretDownFill as Downvote } from "react-icons/bs";
import { BsFillCaretUpFill as Upvote } from "react-icons/bs";

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import SingleBlog from "@/components/lp/SingleBlog";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [tabs, setTabs] = useState([
    { name: "All Questions", current: true },
    { name: "All Blogs", current: false }
  ])

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
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


  const changeTab = (index) => {
    const tempTabs = [...tabs];
    tempTabs.forEach((tab, i) => {
      if (i === index) {
        tab.current = true;
      } else {
        tab.current = false;
      }
    });
    setTabs(tempTabs);
  };

  // fetching all QUESTIONS
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/question", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setQuestions(data);
      }
    };
    fetchData();
  }, []);



  // fetching all blogs ----->
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        setBlogs(data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="lg:col-span-9 xl:col-span-7">
        <div className="px-4 sm:px-0">
          <div className="sm:hidden">
            <label htmlFor="question-tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="question-tabs"
              className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab, index) => (
                <option key={index}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
              aria-label="Tabs"
            >
              {tabs.map((tab, tabIdx) => (
                <a
                  key={tabIdx}
                  href={tab.href}
                  onClick={() => changeTab(tabIdx)}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-l-lg" : "",
                    tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                  )}
                >
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.current ? "bg-rose-500" : "bg-transparent",
                      "absolute inset-x-0 bottom-0 h-0.5"
                    )}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="sr-only">Recent questions</h1>
          {
            tabs[0].current &&
            <ul role="list" className="space-y-4">
              {!questions &&
                <div className="flex items-center justify-center">
                  <CircularProgress className=" w-full h-full" />
                </div>

              }
              {questions && questions.map((question, index) => (
                <li
                  key={index}
                  className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                >
                  <article
                    aria-labelledby={"question-title-" + question._id}
                  >
                    <div>
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={question.authorImageUrl || '/images/default.jpg'}
                            height={1000} width={1000}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a
                              href={"profile/" + question.author}
                              className="hover:underline"
                            >
                              {question.author}
                            </a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <time dateTime={question.date}>
                              {getDate(question.date)}
                            </time>
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
                      <Link href={"/question/view/" + question._id}>
                        <h2
                          id={"question-title-" + question._id}
                          className="mt-4 text-base font-medium text-gray-900"
                        >
                          {question.title}
                        </h2>
                      </Link>
                    </div>
                    <Link href={"/question/view/" + question._id}>

                    </Link>


                    <div className="mt-2 flex space-x-2">
                      {question?.tags?.map((tag, index) => (
                        <button
                          key={index}
                          type="button"
                          className="inline-flex items-center rounded-sm border border-gray-500 bg-white px-1 py-0.5 text-xs font-normal text-gray-500 hover:bg-blue-600 indigo-500 hover:text-white focus:outline-none"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-between space-x-8">
                      <div className="flex space-x-6">
                        <span className="inline-flex items-center text-sm">
                          <span className="inline-flex space-x-1 text-gray-400 ">
                            <Upvote
                              className="h-5 w-5 hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {question.vote}
                            </span>
                            <span className="sr-only">views</span>
                            <Downvote
                              className="h-5 w-5 hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="inline-flex items-center text-sm">
                          <button
                            type="button"
                            className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          >
                            <ChatBubbleLeftEllipsisIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {question.answers_count} Answers
                            </span>
                            <span className="sr-only">answers</span>
                          </button>
                        </span>
                        <span className="inline-flex items-center text-sm">
                          <button
                            type="button"
                            className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                          >
                            <EyeIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="font-medium text-gray-900">
                              {question.question_views} Views
                            </span>
                            <span className="sr-only">views</span>
                          </button>
                        </span>
                      </div>
                      <div className="flex text-sm">
                        <span className="inline-flex items-center text-sm">
                          <span className="font-medium text-gray-900">
                            <Link href={"/qna/view_question/" + question._id}>
                              <Button variant="outlined" size="small">
                                ANSWER
                              </Button>
                            </Link>
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          }

          {tabs[1].current &&
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              {blogs && blogs.map((blog, index) => (
                <SingleBlog key={index} blog={blog} />
              ))}
            </div>
          }
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  9
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
