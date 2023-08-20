import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'

import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SingleBlog = ({ blog }) => {



    return (
        <Card className='w-[400px] h-[450px] m-3' key={blog._id}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "red[500]" }} aria-label="">
                        {/* {R} */}
                    </Avatar>
                }
                title={blog?.username}
                subheader={blog?.date}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog?.title}
                </Typography>
            </CardContent>
            <div className="ml-4 mt-3 flex space-x-2">
                <small>Category: <b>{blog?.category}</b></small>
            </div>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {blog?.post_body}
                </Typography>
            </CardContent>
            <div className="ml-4 flex space-x-2">
                <small>tags: </small> {blog?.tags?.map((tag, index) => (
                    <button
                        key={index}
                        type="button"
                        className="inline-flex items-center rounded-sm border border-gray-500 bg-white px-1 py-0.5 text-xs font-normal text-gray-500 hover:bg-blue-600 indigo-500 hover:text-white focus:outline-none"
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <CardActions disableSpacing className="d-flex justify-between item-center">
                <IconButton aria-label="add to favorites">
                    <CommentIcon />&nbsp; <span>{blog?.comment_count}</span>
                </IconButton>
                <Link
                    href={"/lp/view_post/"+blog._id}
                >
                    <Button
                        className=''
                    >View</Button></Link>
                <IconButton aria-label="share">
                    <VisibilityIcon />&nbsp; <span>{blog?.views_count}</span>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default SingleBlog