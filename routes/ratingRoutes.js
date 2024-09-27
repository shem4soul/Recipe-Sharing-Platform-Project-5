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

router.post("/create-rating", validateToken, validateRating, createRating)

router.get("/find-rating", validateToken, getRating)

router.put("/update-rating/:id", validateToken, updateRating)

router.delete("/delete-rating/:id", validateToken, deleteRating)

module.exports = router