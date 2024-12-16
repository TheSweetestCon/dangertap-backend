import { pool } from '../config/db.js';

export class LocationModel {
    static async setLocation(user) {
        const { id, latitude, longitude, precisao, emergencia } = user

        
        const [result] = await pool.query(
          `INSERT INTO LOCALIZACAO (ID_PESSOA,
                                    LATITUDE,
                                    LONGITUDE,
                                    PRECISAO,
                                    DATA_INSERCAO,
                                    EMERGENCIA)
                            VALUES (?,
                                    ?,
                                    ?,
                                    ?,
                                    NOW(),
                                    ?)
        `, [id, latitude, longitude, precisao, emergencia])

        return result.insertId
    }

    static async getLocation(id) {

        const [result] = await pool.query(
        `SELECT MAX(ID),
                LATITUDE,
                LONGITUDE,
                PRECISAO
            FROM LOCALIZACAO
            WHERE ID_PESSOA = ?
        GROUP BY LATITUDE,
                LONGITUDE,
                PRECISAO
        `, [id])


        return result
    }
}