const mongose = require('../utils/db.js');

const User = mongose.model('child', {
    username: String,
    password: String
})

module.exports = {
    save({ username, password }) {
        const user = new User({
            username,
            password
        })
        return user.save()
    },
    findone(username) {
        return User.findOne({ username })
    }
}