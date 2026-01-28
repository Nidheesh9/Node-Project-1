import { User } from "../models/index.js";
import catchAsync from "../utils/catchAsync.js";
import CustomError from "../utils/CustomError.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/utils.js";

// Register a new user
const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return next(new CustomError("Email already in use", 400));
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken({ id: newUser.id, email: newUser.email });

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

// Login user
const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new CustomError("Invalid email or password", 401));
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return next(new CustomError("Invalid email or password", 401));
  }

  const token = generateToken({ id: user.id, email: user.email });

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});

export { registerUser, loginUser };
