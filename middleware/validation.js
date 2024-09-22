
const validateRegistration = async (req, res) => {
    const { username, email, password, bio, favoriteCuisines }  = req.body

    const errors = []

    if(!email){
        errors.push("please add ur email")
    }

    if(password.length < 8){
    errors.push("minimum of eight chartacter requied")
    }

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }
}

module.exports = {
    validateRegistration
} 



