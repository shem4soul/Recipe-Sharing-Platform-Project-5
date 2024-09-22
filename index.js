const express = require("express")
const connectTODatabase = require("./db")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("./models/AuthModel")

const validateRegistration = require("./middleware/validation")

const  app = express()

//middleware
app.use(express.json())

const PORT = process.env.PORT || 8000

// Connect to DataBASE

connectTODatabase()

app.listen(PORT, () =>{
    console.log(`Server running on  ${PORT}`)
})

/*app.post("/register", validateRegistration, async (req, res) => {
  const { username, email, password, bio, favoriteCuisines }  = req.body
    

    const existingUser= await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"User Account already exist"})
    }






    
   const newUser = new User ({username, email, password, bio, favoriteCuisines})
   
   await newUser.save()

   return res.status(200).json({
    message: "Sucessful",
    User: newUser
   })
     
  

// hash password
const hashedPassword = await bcrypt.hash(password, 12)

} )
*/
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
        const User = await User.findOne({ email })
        if (!User || !(await bcrypt.compare(password, User.password))) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: User._id }, 'secretKey', { expiresIn: '20min' })
        return res.status(201).json({ token })
    } catch (error) {
        return res.status(401).json({ error: 'Login failed' })
    }
}


