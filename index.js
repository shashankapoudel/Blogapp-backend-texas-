
const express = require('express')
const dotenv = require("dotenv")
const connectDB = require("./src/config/db")
const cors = require("cors")

dotenv.config()

connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://blogapp-frontend-texas.vercel.app'
    ],
    method: ['GET', 'POST']
}))

app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/blogs', require('./src/routes/blogRoutes'))
app.use('/api/comments', require('./src/routes/commentRoutes'))



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})