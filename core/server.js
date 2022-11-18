const express = require("express")
const app = express()
const config = require('./config.json')
const port = config.system.api_port
const mongoose = require("mongoose");
const proxy = require("express-http-proxy")
const cors = require("cors")
// const bodyparser = require("body-parser")
require("../common/mongo-db").mongoDBConnection(mongoose, config.mongo);
const auth = require("./middleware/auth")
app.use(cors());

app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>You are in vendor form</h1>")
})

// app.use(bodyparser.json())
const vendorRoutes = require("./routes/vendorRoute")
app.use("/vendor", vendorRoutes)
app.use("/product", auth.vendorAuth, proxy("http://localhost:5001"))
app.use("/order", auth.vendorAuth, proxy("http://localhost:5002"))

app.listen(port, () => {
    console.log(`you are connected to port ${port}..!!!`)
})