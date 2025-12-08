import { findAllOffers, findOfferById, createOffer, deleteOffer, updateOffer} from '../service/offers.service.js'

export const getAllOffers = async (req,res) => {
  try {
    const offers = await findAllOffers()
    return res.status(200).json(offers)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getOfferById = async (req,res) => {
  try {
    const id = req.params.id
    const offer = await findProductById(id)

    if (!offer) {
      return res.status(404).json({error: `No existe oferta con ID ${id}.`})
    }

    return res.status(200).json(offer)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const postOffer = async (req,res) => {
  try {
    const newOffer = await createOffer(req.body)

    return res.status(201).json(newOffer)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const putOffer = async (req,res) => {
  try {
    const updated = await updateOffer(req.body)

    if(!updated)
      return res.status(404).json({msj:"No se encontro la oferta a actualizar."});
  
    res.status(200).json({mjs:"Oferta actualizado correctamente"});
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const deleteOfferById = async (req,res) => {
  try {
    const offer = await findOfferById(req.params.id)

    if (!offer) {
      return res.status(404).json({error: `No existe oferta con ID ${req.params.id}.`})
    }

    await deleteOffer(offer)

    return res.status(201).json({message: `Se eliminó la oferta ID ${req.params.id}`})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}