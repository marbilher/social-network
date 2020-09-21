const sqlDB = require('../../server.js')
const crypto = require('crypto')


module.exports = {
    registerNew,
    checkIfEmailExists,
    login
}

function checkIfEmailExists(req, res) {
    //Do I need to check req.email value here to prevent injection?
    return new Promise ((resolve, reject) => {
        sqlDB.query(`SELECT * FROM social_network.user WHERE email = '${req.email}'` , function(err, result) {
            if (err) console.log(err);
            resolve(result)
            reject(err)
        })
    })
}

function login(attempt, data) {
    let iterations = 10000;

    let hashedPassword = crypto.pbkdf2Sync(attempt.password, data[0].salt, iterations, 16, 'sha256').toString('hex')
    return hashedPassword === attempt.password
}
//Good reference here: https://repl.it/@grant_wade/salt-hash#index.js
function registerNew(req, res) {
    return new Promise( ( resolve, reject ) => {  
        let query = "INSERT INTO user (email, password, salt, confirmed_email, approved) VALUES (?,?,?,?,?)";
        let salt = crypto.randomBytes(128).toString('base64');
        let iterations = 10000;
        let hashedPassword = crypto.pbkdf2Sync(req.password, salt, iterations, 16, 'sha256').toString('hex')

        sqlDB.query(query, [req.email, hashedPassword, salt, 0, 0], function(err, result) {
            if (err) throw err;
            console.log("Info successfully Saved!");
            console.log(result)
            resolve(result)
            reject(err)
        })
    })
}