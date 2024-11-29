import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SECRET

export const validateToken = (req, res, next) => {

    const tokenHeader = req.headers['authorization']
    const token = tokenHeader && tokenHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({ message: "Não autorizado!"})
    }

    try {

        jwt.verify(token, secret)
        next()
        
    } catch (error) {
        

        if(error.name === "TokenExpiredError"){
            res.status(401).json({ message: error.name, error})
            console.log(error.message)
        } else {
            res.status(401).json({ message: "Token inválido", error})
            console.log(error.message)
        }

    }
}