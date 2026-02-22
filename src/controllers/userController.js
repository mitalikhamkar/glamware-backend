//userController
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });

  res.json({ msg: "Signup successful" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ msg: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "SECRET");
  res.json({ token });
};
