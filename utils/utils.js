import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import logger from "../config/logger.js";

// Hash password using bcrypt
async function hashPassword(password) {
  return await bcrypt.hash(password, config.saltRounds);
}

// Compare password with hashed password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
}

// Schedule a task reminder
function scheduleTaskReminder(task) {
  const reminderTime = new Date(task.dueDate).getTime() - Date.now();

  // Ignore past dates
  if (reminderTime <= 0) return;

  setTimeout(() => {
    logger.info(`Reminder: Task "${task.title}" is due at ${task.dueDate}`);
  }, reminderTime);
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
}

export {
  generateToken,
  hashPassword,
  comparePassword,
  scheduleTaskReminder,
  verifyToken,
};
