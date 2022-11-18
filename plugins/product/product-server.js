const express = require("express")
const mongoose = require("mongoose")
const app = express()
const config = require('./config.json')
const port = config.system.api_port


require("../../common/mongo-db").mongoDBConnection(mongoose, config.mongo);

app.get("/",(req,res)=>{
    res.send("<h1>You are on product model</h1>")
})

app.use(express.json())

const productRoute = require("./routes/productRoutes")
app.use("/product",productRoute)

app.listen(port,()=>{
    console.log(`You connected to port ${port}`)})
