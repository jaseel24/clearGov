const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose
        .connect(process.env.MONGOS_URI)
        .then((conn) => {
            console.log(`The database is connected : ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(err.message,"from db");
        });
};

module.exports = dbConnect;
