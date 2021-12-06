const bcrypt = require('bcrypt');

let saltRounds = 10;

module.exports = {
    funBcrypt(myPlaintextPassword) {
        return new Promise((resolve) => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    // Store hash in your password DB.
                    resolve(hash); 
                });
            })
        })
    },
    comparePassword(myPlaintextPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
                // Store hash in your password DB.
                resolve(res); 
            });
        })
    }
}