const express = require("express")

const { validateToken } = require("../middleware/validateAuth")
const {
  createRating,
  getRating,
  updateRating,
  deleteRating,
} = require("../controllers/rating")
const { validateRating } = require("../middleware/validation")

const router = express.Router()

// Create a new rating
router.post("/ratings", validateToken, validateRating, createRating)

// Retrieve a rating by ID
router.get("/ratings/:id", validateToken, getRating)

// Update a rating by ID
router.put("/ratings/:id", validateToken, validateRating, updateRating)

// Delete a rating by ID
router.delete("/ratings/:id", validateToken, deleteRating)

module.exports = router
