import { findAllProducts, findProductById, createProduct, deleteProduct, updateProduct} from '../service/products.service.js'

export const getAllProducts = async (req,res) => {
  try {
    const products = await findAllProducts()
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getProductById = async (req,res) => {
  try {
    const id = req.params.id
    const product = await findProductById(id)

    if (!product) 
      return res.status(404).json({error: `No existe producto con ID ${id}.`})

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const postProduct = async (req,res) => {
  try {
    const newProduct = await createProduct(req.body)

    return res.status(201).json(newProduct)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const updateProductById = async (req,res) => {
  try {
    const updated = await updateProduct(req.body)

    if(!updated)
      return res.status(404).json({msj:"No se encontro el producto a actualizar."});
  
    res.status(200).json({mjs:"Producto actualizado correctamente"});
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const deleteProductById = async (req,res) => {
  try {
    const product = await findProductById(req.params.id)

    if (!product) 
      return res.status(404).json({error: `No existe producto con ID ${req.params.id}.`})

    await deleteProduct(product)

    return res.status(201).json({message: `Se eliminó el producto ID ${req.params.id}`})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}