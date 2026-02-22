import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  avatar: {
  gender: { type: String, default: null },
  skinColor: { type: String, default: null },
  bodyType: { type: String, default: null },
  photoUrl: { type: String, default: null }
}
  
}, { timestamps: true });


export default mongoose.model("User", userSchema);
