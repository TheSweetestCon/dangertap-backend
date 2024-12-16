import { ReponsavelModel } from '../models/responsavelModel.js';

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
