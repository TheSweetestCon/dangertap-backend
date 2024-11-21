import * as userModel from '../models/userModel.js'

export const getUsers = async (req, res) => {
    try {
      const users = await userModel.getUsers(req.query);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const createUser = async (req, res) =>{
    try {
        console.log(req.body)
        const user = await userModel.createUser(req.body);
        res.sendStatus(200)
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}