const User = require("../models/AuthModel")


const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials')
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' })
  res.json({ token })
}










const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' })
};

/* Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};



// CRUD Operations (Create, Read, Update, Delete):

// Creating a new recipe
const createRecipe = async (req, res) => {
    try {
      const recipe = new Recipe({ ...req.body, author: req.userId });
      await recipe.save();
      res.status(201).json(recipe);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  };


  
  // Update a recipe
  const updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  }
  
  // Delete a recipe
  const deleteRecipe = async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Recipe deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  }*/