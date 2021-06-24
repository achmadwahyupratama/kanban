const { verify } = require("../helpers/jwt")
const { User } = require("../models")
async function authenticate (req, res, next){
    try {
        const token = req.headers.access_token
        const passedUser = verify(token)
        let toValidateUser = await User.findByPk(passedUser.id)
        if (toValidateUser) {
            req.activeUser = {id : toValidateUser.id, username: toValidateUser.username, email: toValidateUser.email}
            next()
        } else {
            next({name: 'Invalid access token'})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authenticate