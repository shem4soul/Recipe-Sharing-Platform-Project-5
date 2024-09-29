const mongoose = require("mongoose")

// Define valid sort fields at the top level
const validSortFields = ['rating', 'createdAt', 'name']

// Middleware for validating search queries
const validateSearch = (req, res, next) => {
    const { category, ingredients, preferences } = req.query

    // Ensure at least one search criteria is provided
    if (!category && !ingredients && !preferences) {
        return res.status(400).json({
            message: "Please provide at least one search parameter: category, ingredients, or preferences.",
        })
    }
    next()
}

// Middleware for validating browse queries
const validateBrowse = (req, res, next) => {
    const { page, limit, sortBy } = req.query

    // Ensure pagination parameters are valid numbers
    if (page && isNaN(page)) {
        return res.status(400).json({
            message: "Page number must be a valid number.",
        })
    }
    if (limit && isNaN(limit)) {
        return res.status(400).json({
            message: "Limit must be a valid number.",
        })
    }

    // Ensure sortBy is a valid field
    if (sortBy && !validSortFields.includes(sortBy)) {
        return res.status(400).json({
            message: "Invalid sort field. Sort by rating, createdAt, or name.",
        })
    }

    next()
}

module.exports = {
    validateSearch,
    validateBrowse,
    validSortFields, 
}
