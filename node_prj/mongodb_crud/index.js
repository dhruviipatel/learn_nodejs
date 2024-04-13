const express = require("express")
const app = express()
const PORT = 1111

const userRouter = require("./routes/userRoute")

const { connectMongodb } = require("./connection")
const { logReqRes } = require("./middleware")



//connection
connectMongodb('mongodb://127.0.0.1:27017/My-testing')//working


//pass the headers
app.use(express.urlencoded({ extended: false }));//working

//middleware
app.use(logReqRes('log.txt'))//working

//Routes
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log("app started"));//working