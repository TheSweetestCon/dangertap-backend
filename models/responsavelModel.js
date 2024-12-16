import { pool } from '../config/db.js';

export class ReponsavelModel{
    static async getResponsavel(userID){

        const [result] = await pool.query(
            `SELECT R.ID_RESPONSAVEL,
                    PR.NOME AS RESPONSAVEL,
                    R.ID_PESSOA,
                    P.NOME
               FROM PESSOA P
         INNER JOIN RESPONSAVEL R
                 ON P.ID = R.ID_PESSOA
         INNER JOIN PESSOA PR
                 ON PR.ID = R.ID_RESPONSAVEL
              WHERE R.ID_RESPONSAVEL = ?
        `, [userID])

        return result
    }
}