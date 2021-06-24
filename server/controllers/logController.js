const { decryptPassword } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {User} = require('../models')
const { OAuth2Client } = require('google-auth-library')

class LogController{
    static register(req, res, next){
        const regUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(regUser)
            .then(newUser=>{
                res.status(201).json({id: newUser.id, username: newUser.username, email: newUser.email})
            })
            .catch(err=>{
                if (err.name === "SequelizeUniqueConstraintError") {
                    next({name: err.name, message:"This email already exist"})
                } else {
                    next(err)
                }
            })
    }

    static login(req, res, next){
        const logUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: { email: logUser.email }})
            .then((foundUser)=>{
                if (!foundUser) {
                    next({name: "invalid email and password"})                                        
                } else if(decryptPassword(logUser.password, foundUser.password)) {
                    const loggedUser = {
                        id: foundUser.id,
                        username: foundUser.username,
                        email: foundUser.email
                    }
                    const token = sign(loggedUser)
                    res.status(200).json({access_token: token})
                } else {
                    next({name: "invalid email and password"})                    
                }
            })
    }
    
    static googleLogin(req, res, next){
        // console.log('masuk ke server log controller');
        console.log(req.body.idToken);
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        let email = ``
        let username = ``
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then((ticket)=>{
                // console.log('masuk tikettt');
                const payload = ticket.getPayload()
                // console.log(payload, '<<<<<<<<<<<<<<<<< cari payload');
                email = payload.email
                username = payload.name
                return User.findOne({where: { email } })
            })
            .then((user) => {
                // console.log('masuk user udah ada');
                if (!user) {
                    return User.create({username: username, email: email, password: process.env.GOOGLE_PASSWORD})
                } else {
                    const token = sign({id:user.id, email:user.email})
                    res.status(200).json({ access_token: token })
                }
            })
            .then(createdUser => {
                // console.log('masuk user gaada, terus bikin');
                const token = sign({id:createdUser.id, email:createdUser.email})
                res.status(201).json({ access_token: token })
            })
            .catch((err)=>{
                console.log(err);
                next(err)
            })
    }
}


module.exports = LogController