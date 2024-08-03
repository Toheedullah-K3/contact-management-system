import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})
        

        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json({
            "error": "Something went wrong while generating referesh and access token"
        })
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
    // console.log(user)
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        return res.status(400).json({
            "error": "Password is not Correct"
        })
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
    console.log("accessToken ---> ", accessToken)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false,
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
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        "Logout": "User logged Out"
    })
}

const refreshAccessToken = async (req, res) => {
    // get the incoming refresh Token
    // validate token - if not empty
    // decodedToken = jwt.verify -> incomingRefreshToken
    // user = findById -> decodedToken
    // validate user - check if not empty
    // compare incomingRefreshToken and the token in out DB
    // generate new Access nd Refresh Token
    // return -> Cookie nd Tokens

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).send("Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id)

        if (!user) {
            return res.status(401).send("Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).send("Refresh token is expired or used")
        }

        const {accessToken, refreshToken} = generateAccessAndRefereshTokens(user._id)

        const options = {
            httpOnly: true,
            secure: false // just for thunderclient
        }
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            accessToken,
            refreshToken
        )
    } catch (error) {
        return res.status(401).send("Invalid Refresh Token")
    }
}
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}


