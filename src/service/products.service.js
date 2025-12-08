import { params } from '../config/params.js'
import { Utils } from '../config/utils.js'
import {db} from '../firebase/config.js'
import {ProductModel} from '../model/product.model.js'
import { collection, getDoc, getDocs,doc,deleteDoc, updateDoc, addDoc } from 'firebase/firestore'

const collectionName = params.db.product

export const findAllProducts = async () => {
  const productsCollection = collection(db, collectionName)
  const snapshot = await getDocs(productsCollection)

  if (snapshot.empty) return []

  return snapshot.docs.map(doc => new ProductModel({id:doc.id,...doc.data()}))
}

export const findProductById = async (id) => {
  const docReference = doc(db, collectionName, id)
  const docSnap = await getDoc(docReference)
  
  if (!docSnap.exists()) return null

  return new ProductModel({id: docSnap.id, ...docSnap.data()})
}

export const createProduct = async (product) => {
  const { nombre, precio, cantidad } = product
  const errors = []

  if (!Utils.isValidString(nombre))
    errors.push('Nombre de producto inválido')
  if (!Utils.isValidFloat(precio))
    errors.push('El precio debe ser mayor a 0')
  if (!Utils.isValidInt(cantidad))
    errors.push('El stock inicial debe ser mayor a 0')

  if (errors.length > 0) 
    throw new Error(`Se produjeron los siguientes errores: ${errors.concat()}`)
    
  const productsCollection = collection(db, collectionName)
  const id = (await getDocs(productsCollection)).size + 1

  const newProduct = {
    nombre: nombre,
    precio: precio,
    cantidad: cantidad,
    imagen: `https://picsum.photos/200/300?random=${id}`,
    esOferta: false
  }

  const docReference = await addDoc(productsCollection, newProduct)

  return new ProductModel({id: docReference.id , ...newProduct})
}

export const updateProduct = async (product) => {
  const docReference = doc(db, collectionName, product.id)
  const docSnap = await getDoc(docReference)

  if (!docSnap.exists())
    return null

  await updateDoc(docReference, product)

  return true
}

export const deleteProduct = async (product) => {
  const docReference = doc(db, collectionName, product.id);
  const docSnap = await getDoc(docReference)

  if(!docSnap.exists()) return null;

  await deleteDoc(docReference);
  return true;
}