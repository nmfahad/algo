import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
   title: {
    type: String,
    required: true,
  },
    date: {
    type: String,
    default: Date.now,
  },
    author: {
    type: String,
    required: false,
  },
  question_body: {
    type: String,
    required: true,
  },
  question_views: {
    type: Number,
    default: 0,
  },
  answers_count: {
    type: Number,
    default: 0,
  },
    category: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  vote: {
    type: Number,
    default: 0,
  },
  answer_list: [
    {
      type: String,
      default: null,
    }
  ],
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

const Questions =
  mongoose.models.questions || mongoose.model("questions", questionsSchema);

export default Questions;