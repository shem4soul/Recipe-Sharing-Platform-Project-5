const Rating = require("../models/Rating")



const createRating = (req, res) => {
    // Logic to create a rating
    res.send("Rating created");
}

const getRating = (req, res) => {
    // Logic to get a rating
    res.send("Rating retrieved")
}

const updateRating = (req, res) => {
    // Logic to update a rating
    res.send("Rating updated")
}

const deleteRating = (req, res) => {
    // Logic to delete a rating
    res.send("Rating deleted")
}

module.exports = {
    createRating,
    getRating,
    updateRating,
    deleteRating,
}