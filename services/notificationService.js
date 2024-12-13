import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert({
    type: process.env.FIREBASE_type,
    project_id: process.env.FIREBASE_project_id,
    private_key_id: process.env.FIREBASE_private_key_id,
    private_key: process.env.FIREBASE_private_key.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_client_email,
    client_id: process.env.FIREBASE_client_id,
    auth_uri: process.env.FIREBASE_auth_uri,
    token_uri: process.env.FIREBASE_token_uri,
    auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.FIREBASE_client_x509_cert_url,
    }),
})

console.log('Firebase inicializado com sucesso!');

const messaging = admin.messaging();

export async function sendPushNotification(token, title, message){
    try {
        const payload = {
            notification: {
                title,
                body: message,
            },
        };

        const response = await messaging.sendToDevice(token, payload)

        console.log('Notificação enviada com sucesso: ', response)
    } catch (error) {
        console.error('Erro ao enviar notificação: ', error)
    }
}