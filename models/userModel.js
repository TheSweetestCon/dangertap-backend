import mysql2 from 'mysql2/promise';
import dbConfig from '../config/db.js';

export async function getUsers(params) {

    const pool = mysql2.createPool(dbConfig);

    try {
        let query = `SELECT * FROM PESSOA WHERE 1=1`
        let queryParams = []

        if(Object.keys(params).length){
            let { id, nome, cpf, telefone, data_nascimento, email, genero, status} = params

            if(id){
                query += ` AND ID IN (?)`
                queryParams.push(id)
            }

            if(nome){
                query += ` AND NOME IN (?)`
                queryParams.push(nome)
            }

            if(cpf){
                query += ` AND CPF IN (?)`
                queryParams.push(cpf)
            }

            if(telefone){
                query += ` AND TELEFONE IN (?)`
                queryParams.push(telefone)
            }

            if(data_nascimento){
                query += ` AND DATA_NASCIMENTO IN (?)`
                queryParams.push(data_nascimento)
            }

            if(email){
                query += ` AND EMAIL IN (?)`
                queryParams.push(email)
            }

            if(genero){
                query += ` AND GENERO IN (?)`
                queryParams.push(genero)
            }

            if(status){
                query += ` AND STATUS IN (?)`
                queryParams.push(status)
            }
        }


        const [rows] = await pool.query(query, queryParams);
        return rows;

    } catch (error) {

        console.error('Error fetching users:', error);
        throw error;

    } finally {

        pool.end();

    }
}

export async function createUser(user){
    const pool = mysql2.createPool(dbConfig);
    console.log(user)
    try {

    let { nome, cpf, telefone, data_nascimento, email, genero} = user

    const [result] = await pool.query(`INSERT INTO PESSOA (NOME, 
                                                           CPF, 
                                                           TELEFONE, 
                                                           DATA_NASCIMENTO, 
                                                           EMAIL, 
                                                           GENERO)
                                                   VALUES (upper(?),
                                                           ?,
                                                           ?,
                                                           str_to_date(?, "%d/%m/%Y"),
                                                           upper(?),
                                                           upper(?))`,
                                      [nome, cpf, telefone, data_nascimento, email, genero]);
    
    return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        pool.end();
    }
}