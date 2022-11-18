const express = require("express")
const mongoose = require("mongoose")
const http = require("http")
const config = require("./config.json")

require("../../common/mongo-db").mongoDBConnection(mongoose, require("./config.json").mongo);

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to customer manager service');
});

const port = process.env.PORT || config.system.api_port;
app.set('port', port);

const rpcServer = require('./rpc-server');

try{
    rpcServer.run();
} catch (e) {
    console.log("mmmm", e.message)
    console.log("############# ERROR #############");
    console.log(e);
    process.exit(1);
}
process
    .on('uncaughtException', err => {
        console.log("---->>>>>>>", err)
        console.log("############# ERROR #############");
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`customer management is running on port:${port}`)
})