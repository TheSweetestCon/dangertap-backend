import {UserModel} from '../models/userModel.js'

export const getUser = async (req, res) => {
  
  console.log(req.body)
  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Necessário mais informações!' });
  }
  
  try {
    let users;

    

    if (req.body.email) {
      users = await UserModel.getByEmail(req.body.email);
    } else {
      users = await UserModel.getUser(req.body);
      console.log(users)
    }

    if (users.length === 0) {
      console.log('entrou')
      return res.status(200).json({ message: 'user_not_found', data: users });
    }

    res.status(200).json({message: 'user_found', data: users[0]?.EMAIL });

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




