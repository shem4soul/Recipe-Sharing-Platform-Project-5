const express = require("express")
const connectTODatabase = require("./db")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("./model/AuthModel")






const  app = express()

const PORT = process.env.PORT || 8000

// Connect to DataBASE

connectTODatabase()

app.listen(PORT, () =>{
    console.log(`Server running on  ${PORT}`)
})


// User registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newUser = new User({ username, email, password })
    await newUser.save()
    res.status(200).json({ message: 'User registrtaion is successfully' })
  } catch (err) {
    res.status(400).json({ error: 'User registration failed' })
  }
}


// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '20min' })
        return res.status(201).json({ token })
    } catch (error) {
        return res.status(401).json({ error: 'Login failed' })
    }
}


