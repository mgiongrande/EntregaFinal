import { params } from '../config/params.js'
import { Utils } from '../config/utils.js'
import { db } from '../firebase/config.js'
import { ProductModel } from '../model/product.model.js'
import { collection, getDoc, getDocs,doc,deleteDoc, updateDoc, addDoc } from 'firebase/firestore'

const collectionName = params.db.offer

export const findAllOffers = async () => {
  const offersCollection = collection(db, collectionName)
  const snapshot = await getDocs(offersCollection)

  if (snapshot.empty) return []

  return snapshot.docs.map(doc => new ProductModel({id:doc.id,...doc.data()}))
}

export const findOfferById = async (id) => {
  const docReference = doc(db, collectionName, id)
  const docSnap = await getDoc(docReference)
  
  if (!docSnap.exists()) return null

  return new ProductModel({id: docSnap.id, ...docSnap.data()})
}

export const createOffer = async (offer) => {
  const { nombre, precio, cantidad } = offer
  const errors = []

  if (!Utils.isValidString(nombre))
    errors.push('Nombre de producto en oferta inválido')
  if (!Utils.isValidFloat(precio))
    errors.push('El precio debe ser mayor a 0')
  if (!Utils.isValidInt(cantidad))
    errors.push('El stock inicial debe ser mayor a 0')

  if (errors.length > 0) 
    throw new Error(`Se produjeron los siguientes errores: ${errors.concat()}`)
    
  const offersCollection = collection(db, collectionName)
  const id = (await getDocs(offersCollection)).size + 1
  
  const newOffer = {
    nombre: nombre,
    precio: precio,
    cantidad: cantidad,
    imagen: `https://picsum.photos/200/300?random=${id}`, 
    esOferta: true
  }

  const docReference = await addDoc(offersCollection, newOffer)

  return new ProductModel({id: docReference.id , ...newOffer})
}

export const updateOffer = async (offer) => {
  const docReference = doc(db, collectionName, offer.id)
  const docSnap = await getDoc(docReference)

  if (!docSnap.exists())
    return null

  await updateDoc(docReference, offer)

  return true
} 

export const deleteOffer = async (offer) => {
  const docReference = doc(db, collectionName, offer.id);
  const docSnap = await getDoc(docReference)

  if(!docSnap.exists()) return null;

  await deleteDoc(docReference);
  return true;
}