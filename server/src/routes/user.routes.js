import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js"
import { loginUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { logoutUser } from "../controllers/user.controller.js"
import { refreshAccessToken } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"



const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
export default router