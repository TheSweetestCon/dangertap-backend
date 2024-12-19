import { pool } from '../config/db.js';
import { hashPassword } from '../utils/hashUtils.js';

export class UserModel {

  static async getUser(params) {

      let query = `SELECT 1 FROM PESSOA WHERE 1=1`;
      let queryParams = [];

      if (Object.keys(params).length) {
        const { nome, cpf, telefone, data_nascimento, genero, status } = params;

        if (nome) {
          let name = `%${nome}%`;
          query += ` AND NOME LIKE upper(?)`;
          queryParams.push(name);
        }

        if (cpf) {
          query += ` AND CPF IN (?)`;
          queryParams.push(cpf);
        }

        if (telefone) {
          query += ` AND TELEFONE IN (?)`;
          queryParams.push(telefone);
        }

        if (data_nascimento) {
          query += ` AND DATA_NASCIMENTO IN (?)`;
          queryParams.push(data_nascimento);
        }

        if (genero) {
          query += ` AND GENERO IN (?)`;
          queryParams.push(genero);
        }

        if (status) {
          query += ` AND STATUS IN (?)`;
          queryParams.push(status);
        }

      }

      const [rows] = await pool.query(query, queryParams);
      return rows;

  }



  static async getByEmail(email){

    const [result] = await pool.query(`SELECT p.ID, p.NOME, u.EMAIL, u.SENHA FROM USUARIO u INNER JOIN PESSOA p ON u.ID_PESSOA = p.id WHERE EMAIL = upper(?)`, [email])

    return result

  }


  static async createUser(user) {

      const { nome, cpf, telefone, data_nascimento, email, genero, senha } = user;

      const [result] = await pool.query(
            `INSERT INTO PESSOA (NOME, 
                                 CPF, 
                                 TELEFONE, 
                                 DATA_NASCIMENTO, 
                                 GENERO)
                         VALUES (upper(?), 
                                 ?, 
                                 ?, 
                                 str_to_date(?, "%d/%m/%Y"), 
                                 upper(?))`,
        [nome, cpf, telefone, data_nascimento, genero]
      );

      const idPessoa = result.insertId;
      const hashSenha = await hashPassword(senha);

      console.log(`ID inserido: ${idPessoa} | Senha criptografada: ${hashSenha}`);

      await pool.query(
        `INSERT INTO USUARIO (ID_PESSOA, 
                              EMAIL, 
                              SENHA) 
                      VALUES (?, 
                              upper(?), 
                              ?)`,
        [idPessoa, email, hashSenha]
      );

      return idPessoa;

  }



  static async updateUser(id, user) {

      const { nome, telefone, data_nascimento, email, genero } = user;

      await pool.query(
        `UPDATE PESSOA SET NOME = upper(?), 
                           TELEFONE = ?, 
                           DATA_NASCIMENTO = str_to_date(?, "%d/%m/%Y"),  
                           GENERO = upper(?)
                     WHERE ID = ?`,
        [nome, telefone, data_nascimento, genero, id]
      );

  }

  


}

