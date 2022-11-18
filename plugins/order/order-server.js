const express = require("express")
const app = express()
// require("./db/conn")
const config = require('./config.json')
const port = config.system.api_port
app.use(express.json())
const mongoose = require("mongoose")

require("../../common/mongo-db").mongoDBConnection(mongoose, config.mongo);

app.get("/",(req,res)=>{
    res.send("<h1>You are in order model</h1>")
})

const orderRoutes = require("./routes/orderRoute")
app.use("/order",orderRoutes)

app.listen(port,()=>{
    console.log(`You are connected to product with port ${port}`)
})