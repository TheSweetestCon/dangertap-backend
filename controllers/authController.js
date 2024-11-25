import { UserModel } from "../models/userModel.js";
import { comparePassword } from '../utils/hashUtils.js'

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

        if (t(oUpperCase(email) === user.email) && (await comparePassword(senha, hashedPassword))){
            res.status(200).json({token: 'abc'}) //TESTAR
        }
        
        res.json(user)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Erro no servidor", error})
    }
}