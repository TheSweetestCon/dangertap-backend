import { LocationModel } from '../models/locationModel.js'

export const setLocation = async (req, res) => {
  try{
    
    const user = await LocationModel.setLocation(req.body)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

export const getLocation = async (req, res) => {
  try {
    const { id } = req.query

    const location = await LocationModel.getLocation(id)
    res.json(location)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}