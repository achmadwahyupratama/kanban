const bcrypt = require('bcryptjs')

function hashPassword(password){
    return bcrypt.hashSync(password, 9)
}

function decryptPassword(password, hashed){
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hashPassword,
    decryptPassword
}