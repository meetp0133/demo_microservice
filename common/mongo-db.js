module.exports.mongoDBConnection = async (mongoose, mongo) => {

    let options =
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

    let connectionStr = 'mongodb://' + mongo.host + ':' + mongo.port + '/' + mongo.db

    let connection = () => mongoose.connect(connectionStr, options);
    let successful = () => {
        console.log("Mongo DB connection succesfully started on : " + mongo.db);
    };

    let error = async (msg, attempt) => {
        console.error('Mongo DB connection error:', msg);
    };
    connection().then(successful, err => error(err.message, 1));
};


// module.exports.connOther = async (mongoose, db) => {
//
//     let options =
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         };
//
//     let connectionStr = 'mongodb://localhost:27017' + "db"
//
//     return mongoose.createConnection(connectionStr, options);
// }