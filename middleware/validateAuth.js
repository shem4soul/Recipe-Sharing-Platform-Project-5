const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Users = require("../models/AuthModel")

// Validate Registration Middleware
const validateRegistration = async (req, res, next) => {
  const { username, email, password } = req.body
  const errors = []

  // Validate username
  if (!username) {
    errors.push("Please add your username")
  }

  // Validate email
  if (!email) {
    errors.push("Please add your email")
  } else if (!validEmail(email)) {
    errors.push("Invalid email format")
  }

  // Validate password
  if (!password) {
    errors.push("Please add your password")
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }

  // If there are errors, send them as a response
  if (errors.length > 0) {
    return res.status(400).json({ message: errors })
  }

  next()
}

// Validate Login Middleware
const validateLogin = (req, res, next) => {
  // Your login validation logic here, e.g., check for email & password fields
  next()
}

// Helper function to validate email format
function validEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

// Validate JWT Token Middleware
const validateToken = async (req, res, next) => {
  try {
    const headerAuth = req.header("Authorization")

    if (!headerAuth) {
      return res.status(401).json({ message: "Access Denied!" })
    }

    const token = headerAuth.split(" ")[1]

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Login details" })
    }

    const user = await Users.findOne({ username: decoded.user.username })

    if (!user) {
      return res.status(404).json({ message: "User account not found!" })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  validateRegistration,
  validateLogin,
  validEmail,
  validateToken,
}
