const fs = require('fs')
function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n ${Date.now()} - ${req.method} - ${req.path}`, (err, data) => {
            if (err) return console.log('middleware error', err)
            console.log('data added')
            next();
        })
    }
}
module.exports = {
    logReqRes
}