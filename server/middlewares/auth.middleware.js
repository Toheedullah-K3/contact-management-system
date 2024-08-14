import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = async (req, res, next) => {
    // get token from req.cookies or from header
    // validate token - check if not empty
    // decodedToken = verify your token with jwt.verify(token, process.env.token)
    // find user by id with the decodedToken
    // validate user - check if not empty
    // assign it to req.user = user
    // next()
    try {

        const token = req.cookies?.accessToken || req.header("authorization").replace("Bearer ", "")

        if(!token) {
            return res.status(401).json({
                "error": "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({
                "error": "Invalid Access Tokenn"
            })
        }
    
        req.user = user
        next()

    } catch (error) {

        return res.status(400).json({
            "error": "Invalid Access Tokennn"
        })
    }
}

export { verifyJWT }