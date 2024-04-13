const mongoose = require("mongoose")

async function connectMongodb(url) {
    console.log(url)
    return mongoose.connect(url)
        .then(() => console.log('Mongoose connected'))
        .catch((err) => console.log('Mongoose error', err))
}

module.exports = {
    connectMongodb
}