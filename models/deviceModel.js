import { pool } from '../config/db.js';

export class DeviceModel {
    static async getTokenbyId(userID){

        const [result] = await pool.query(
            `SELECT PR.ID AS ID_RESPONSAVEL,
                    PR.NOME,
                    D.TOKEN
               FROM PESSOA P
         INNER JOIN RESPONSAVEL R
                 ON P.ID = R.ID_PESSOA
         INNER JOIN PESSOA PR
                 ON PR.ID = R.ID_RESPONSAVEL
         INNER JOIN USUARIO U
                 ON PR.ID = U.ID_PESSOA
         INNER JOIN DISPOSITIVO D
                    ON U.ID = D.ID_USUARIO
              WHERE P.ID = ?`,[userID])

        return result;
    }

    static async setToken(userID, pushToken, plataform, deviceName){
        console.log('Entrou!')

        const [user] = await pool.query(`SELECT ID FROM USUARIO WHERE ID_PESSOA = ?`, userID)

        const { ID } = user[0]

        const result = await pool.query(
            `INSERT INTO DISPOSITIVO (TOKEN,
                                      ID_USUARIO,
                                      PLATAFORMA,
                                      NOME)
                              VALUES (?,
                                      ?,
                                      upper(?),
                                      upper(?))
            
            `, [pushToken, ID, plataform, deviceName])

        console.log(result)
    }

    static async deleteToken(userID, pushToken){
        const [user] = await pool.query(`SELECT ID FROM USUARIO WHERE ID_PESSOA = ?`, userID)

        console.log(user)

        const { ID } = user[0]

        const result = await pool.query(
            `DELETE FROM DISPOSITIVO
              WHERE TOKEN = ?
                AND ID_USUARIO = ?`, [pushToken, ID])

        return result
    }
}