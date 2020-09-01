const crypto = require('crypto')

module.exports = {
    hashString: hashString
}

function hashString(somethingToHash) {
    if (typeof somethingToHash === 'object') {
        somethingToHash = JSON.stringify(somethingToHash)
    }
    // string - string - iterations - byte length - digest - callback
    return crypto.pbkdf2Sync(somethingToHash, process.env.HASHER_VALUE, 10000, 16, 'sha256').toString('hex')
}
