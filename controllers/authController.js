import { UserModel } from "../models/userModel.js";
import { comparePassword } from '../utils/hashUtils.js'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET

export const login = async (req, res) => {

    const { email, senha } = req.body

    try {

        const user = await UserModel.getByEmail(email)
        const hashedPassword = user[0]?.SENHA ?? ''

        if (!email || !(await comparePassword(senha, hashedPassword))){
            console.log('Usuário ou senha inválido(s)!')
            res.status(401).json({ message: "Usuário ou senha inválido(s)!"})
            return
        }


        const token = jwt.sign({name: user[0]?.nome}, secret)

        console.log(user[0]?.ID)

        res.status(200).json({
            message: 'Login realizado com sucesso!', 
            data: {
                token,
                user: {
                    id: user[0]?.ID,
                    nome: user[0]?.NOME,
                    email: user[0]?.EMAIL
                }
            }}) //TESTAR


    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Erro no servidor", error})
    }
}

