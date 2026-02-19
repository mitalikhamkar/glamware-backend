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
  avatar: {
  gender: { type: String, default: null },
  skinColor: { type: String, default: null },
  bodyType: { type: String, default: null },
  photoUrl: { type: String, default: null }
}
  
});


export default mongoose.model("User", userSchema);
