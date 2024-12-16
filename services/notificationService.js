import * as dotenv from 'dotenv';
import { Expo } from 'expo-server-sdk';


dotenv.config();

export async function sendPushNotification(token, title, message) {
    try {
        const expo = new Expo();

        if (!Expo.isExpoPushToken(token)) {
            console.error(`Token inválido: ${token}`);
            return;
        }

        const chunks = expo.chunkPushNotifications([
            {
                to: token,
                sound: 'default',
                title: title,
                body: message,
            },
        ]);

        for (const chunk of chunks) {
            const ticket = await expo.sendPushNotificationsAsync(chunk);
            console.log('Resultado do envio:', ticket);
        }

        console.log('Notificação enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
    }
}