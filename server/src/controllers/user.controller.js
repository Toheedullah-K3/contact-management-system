import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false})

    return {
        accessToken,
        refreshToken
    }
}

const registerUser = async (req, res) => {
    // get user details from frontend
    // validate - not empty
    // check if user already exist
    // create a user object - create entry in db
    // remove password and refreshToken from response
    // check for user creation
    // return res

    const { username, email, password } = req.body;

    if(
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({
            error: "These Fields cannot be empty !!!"
        })
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        return res.status(400).json({
            error: "User exist krta hai !!!"
        })
    }
    
    try {
        const user = await User.create({
            username,
            email,
            password
        })


        const createdUser = await User.findById(user._id)

        return res.status(201).json({
            createdUser
        })

    } catch (error) {
        // if(error.code === 11000){
        //     console.log("Console- Username or email already exists")
        //     return res.status(400).json({
        //         error: "Username or email already exists"
        //     })
        // }
        console.log("Console- Error Registering the User")
        return res.status(500).json({
            error: error.message
        })
    }
    
}

const loginUser = async (req, res) => {
    // get the data from frontend
    // check if data is not empty
    // find the user in db
    // check is password is valid or not
    // get user from db & hide if you want password to avoid in response
    // return
    
    try {
        const { email, password } = req.body;

    if( !(email || password) ){
        return res.status(400).json({
            "error": "Email & Password is Required !!!"
        })
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({
            "error": "User Does'nt Exist"
        })
    }
    console.log(user)
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        return res.status(400).json({
            "error": "Password is not Correct"
        })
    }
    const { accessToken, refreshToken } = generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        user: loggedInUser, accessToken, refreshToken
    })

    } catch (error) {
        console.log("Login , Something Went Wrong", error)
    }
}

const logoutUser = async (req, res) => {
    
}

export {
    registerUser,
    loginUser,
}