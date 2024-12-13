import {UserModel} from '../models/userModel.js'
import { sendPushNotification } from '../services/notificationService.js';




export async function sendNotification(req, res) {
    const {id, title, message} = req.body;

    const dbToken = await UserModel.getToken(id)

    if(!dbToken || !dbToken[0]?.TOKEN){
        return res.status(404).json({error: 'Token não encontrado ou não registrado para notificações'})
    }

    try {
        await sendPushNotification(dbToken[0].TOKEN, title, message)
        res.status(200).json({message: 'Notificação enviada com sucesso!'})
    } catch (error) {
        res.status(500).json({error: 'Falha ao enviar notificação!'})
    }
}