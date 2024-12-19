import { ReponsavelModel } from '../models/responsavelModel.js';
import { UserModel } from '../models/userModel.js';

export const getResponsavel = async (req, res) => {
    try {
      const { id } = req.query

      console.log('ID responsavel: ', id)

      if(!id){
        res.status(403).json({ message: 'Necessário ID do responsável!' });
        return
      }

      const responsavel = await ReponsavelModel.getResponsavel(id);
      //console.log(responsavel)
      res.json(responsavel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const setResponsavel = async (req, res) => {
  try {
    const { id, email} = req.body;

    if(!email){
      res.status(400).json({ message: 'Necessário informar o email do responsável!' });
      return
    }

    const responsavel = await UserModel.getByEmail(email);

    if(responsavel.length === 0){
      res.status(404).json({ message: 'Usuário não encontrado!' });
      return
    }

    const getResponsavel = await ReponsavelModel.getResponsavel(responsavel[0].ID);

    for (const resp of getResponsavel) {
      console.log(resp.ID_PESSOA)
      if(resp.ID_PESSOA === id){
        
        res.status(409).json({ message: 'Responsável já cadastrado!' });
        return
      }
    }

    if (id === responsavel[0].ID) {
      res.status(403).json({ message: 'Não é possível cadastrar o próprio usuário como responsável!' });
      return
    }

    const response = await ReponsavelModel.setResponsavel(id, responsavel[0].ID);

    console.log('ID inserido: ', response)

    res.status(200).json({ message: 'Responsável cadastrado com sucesso!' });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}
