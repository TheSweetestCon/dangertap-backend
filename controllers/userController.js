import {UserModel} from '../models/userModel.js'

export const getUsers = async (req, res) => {
    try {
      const users = await UserModel.getUsers(req.query);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getResponsavel = async (req, res) => {
    try {
      const { id } = req.query

      if(!id){
        res.status(403).json({ message: 'Necessário ID do responsável!' });
        return
      }

      const responsavel = await UserModel.getResponsavel(id);
      res.json(responsavel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const createUser = async (req, res) =>{
    try {
        console.log(req.body)
        const user = await UserModel.createUser(req.body);
        res.sendStatus(200)
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserModel.updateUser(id, req.body)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}