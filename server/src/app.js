import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"


const app = express()

app.use(cors({
    origin: 'https://contact-management-system-nine.vercel.app/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())

// routes import
import userRouter from "./routes/user.routes.js"
import ContactRouter from "./routes/contact.routes.js"

// routes
app.use("/user", userRouter)
app.use("/contact", ContactRouter)

export { app }
