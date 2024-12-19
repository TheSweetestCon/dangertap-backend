import { sendPushNotification } from '../services/notificationService.js';
import { DeviceModel } from '../models/deviceModel.js';
import { Expo } from 'expo-server-sdk'
import { LocationModel } from '../models/locationModel.js';

export async function setPushToken(req, res) {
    const { id, token, platform, deviceName } = req.body;

    try {

        const device = await DeviceModel.setToken(id, token, platform, deviceName)
        
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export async function deletePushToken(req, res) {
    const { id, token } = req.body;

    console.log(req.body)

    try {
        const device = await DeviceModel.deleteToken(id, token)

        

        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function sendNotification(req, res) {
    const {id, title, message, latitude, longitude, precisao, emergencia} = req.body;

    try {
        const dbRespToken = await DeviceModel.getTokenbyId(id)

        if(!dbRespToken || !dbRespToken[0]?.TOKEN){
            return res.status(404).json({error: 'Token não encontrado ou não registrado para notificações'})
        }

        const registerLocation = await LocationModel.setLocation({id, latitude, longitude, precisao, emergencia})

        const results = []

        for(const record of dbRespToken) {
            const { TOKEN, NOME } = record
            try {
                await sendPushNotification(TOKEN, title, message)
                results.push({NOME, status: 'Sucesso'})
            } catch (err) {
                console.error(`Erro ao enviar para ${NOME} (${TOKEN}): `, err)
                results.push({NOME, status: 'Falha', error: err.message})
            }
        }

        res.status(200).json({results})
    } catch (err) {
        console.error('Erro na consulta ao banco:', err);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
}