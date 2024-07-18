import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from './db/index.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Contact-Management-System App is Listening on port ${port}`)
    })
})
.catch((error) => {
    console.log(`MongoDB Connection Failed !!`, error)
})
