import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title : { type: String ,default:"" },
  address: { type: String ,default:"" },
  imageUrl: { type: String ,default:"/images/default.jpg" },
  about: { type: String ,default:"" },
  join_date: { type: Date, default: Date.now },
  facebook: { type: String ,default:"" },
  twitter: { type: String ,default:"" },
  github: { type: String ,default:"" },
// will add later if needed
//   followers : { type: Number ,default:0 }, 
//   following : { type: Number ,default:0 },
});

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;