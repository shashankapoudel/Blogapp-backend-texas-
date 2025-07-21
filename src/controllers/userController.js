const { generateToken } = require("../config/generateToken");
const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");


const registerUser = asyncHandler(async (req, res) => {
    //Get user credentials
    //check if the user with that email exists or not --
    //  if user exists throw error
    // otherwise create one

    const { name, email } = req.body;

    if (!name || !email) {
        throw new ApiError(400, 'name and email of user is required')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new ApiError(400, 'User with this email already exists')
    }
    const user = await User.create({ email, name })


    return res.status(200).json(new ApiResponse(200, user, 'User registered successfully'))
})



const loginUser = asyncHandler(async (req, res) => {

    // get name and email
    //find the user with the given email\
    //check if the name of user matches with the received name
    //if everything is ok send response

    const { name, email } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, 'User with this email doesnot exist')
    }

    if (user.name !== name) {
        throw new ApiError(400, 'Name doesnot match with the user')
    }

    const token = generateToken(user._id)

    res.status(200).json(new ApiResponse(200, { user, token }, 'User logged in successfully'))
})

module.exports = { registerUser, loginUser }




// const { generateToken } = require("../config/generateToken");
// const User = require("../models/User");
// const { ApiError } = require("../utils/ApiError");
// const { ApiResponse } = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/AsyncHandler");
// const bcrypt = require("bcryptjs")


// const registerUser = asyncHandler(async (req, res) => {

//     const { name, email, password } = req.body;

//     if (!name || !email) {
//         throw new ApiError(400, 'name and email of user is required')
//     }

//     const userExists = await User.findOne({ email })

//     if (userExists) {
//         throw new ApiError(400, 'User with this email already exists')
//     }

//     const salt = await bcrypt.genSalt(10)

//     const hashedPassword = await bcrypt.hash(password, salt)

//     const user = await User.create({ email, name, password: hashedPassword })


//     return res.status(200).json(new ApiResponse(200, user, 'User registered successfully'))
// })



// const loginUser = asyncHandler(async (req, res) => {

//     const { name, email, password } = req.body;

//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new ApiError(404, 'User with this email doesnot exist')
//     }

//     if (user.name !== name) {
//         throw new ApiError(400, 'Name doesnot match with the user')
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password)

//     if (!isPasswordCorrect) {
//         throw new ApiError(400, 'Incorrect password')
//     }

//     const token = generateToken(user._id)

//     res.status(200).json(new ApiResponse(200, { user, token }, 'User logged in successfully'))
// })


// module.exports = { registerUser, loginUser }












