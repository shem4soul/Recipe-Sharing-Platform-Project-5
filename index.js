const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const ratingRoutes = require("./routes/ratingRoutes")
const recipeRecoveryRoutes = require("./routes/recipeRecoveryRoutes")
const recipeRoutes = require("./routes/recipeRoutes")
const certificateRoutes = require("./routes/certificateRoutes")

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

mongoose
  .connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure connection options are included
  .then(() => console.log("MONGODB CONNECTED!"))
  .catch((err) => console.error("Failed to connect to MongoDB", err)) // Handle connection errors

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our Recipe Sharing Platform" })
})

// Use modular route
app.use("/api/auth", authRoutes)
app.use("/api/ratings", ratingRoutes)
app.use("/api/recovery", recipeRecoveryRoutes)
app.use("/api/recipes", recipeRoutes)

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist!",
  })
})





