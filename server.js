if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express")
const app = express()
const express_layouts = require("express-ejs-layouts")

const index_router = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname+ "/views")
app.set("layout", "layouts/layout")

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on("error", error =>console.error(error))
db.once("open", ()=>console.log("Connected to Mongoose"))

app.use(express_layouts)
app.use(express.static("public"))

app.use("/", index_router)

app.listen(process.env.PORT || 3000)
