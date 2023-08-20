import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    post_body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    tags: [
        {
            type: String,
        },
    ],
    category: {
        type: String,
        required: true,
    },
    views_count: {
        type: Number,
        default: 0,
    },
    comment_count: {
        type: Number,
        default: 0,
    },
    comment_list: [
        {
            post_id: {
                type: Number,
            },
            authorUsername: {
                type: String,
            },
            authorImageUrl: {
                type: String,
            },
            body: {
                type: String,
            },
        }
    ],
});

const Blogs =
    mongoose.models.blogs || mongoose.model("blogs", blogsSchema);

export default Blogs;
