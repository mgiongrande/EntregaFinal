import bcrypt from 'bcryptjs'
import { params } from '../config/params.js'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { db } from '../firebase/config.js'

const collectionName = params.db.login

export const verifyCredentials = async (email, password) => {
  const q = query(
    collection(db,collectionName),
    where("email", "==" , email)
  );
  const snap = await getDocs(q)

  if(snap.empty) 
    throw new Error("Usuario no encontrado")

  const userDoc = snap.docs[0];
  const user = userDoc.data();

  const valid = await bcrypt.compare(password, user.password)
  console.error(user)
  if(!valid) 
    throw new Error("Contraseña incorrecta")

  const {password: _ , ...userSafe} = user
  return {id: userDoc.id, ...userSafe}
}

export async function createUser(data) {
  const { nombre, email, password } = data;

  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  const q = query(
    collection(db, collectionName),
    where("email", "==", email)
  );

  const existing = await getDocs(q);
  if (!existing.empty) {
    throw new Error("El correo electrónico ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    nombre,
    email,
    password: hashedPassword,
  };

  const ref = await addDoc(collection(db, collectionName), newUser);

  const { password: _, ...safeUser } = newUser;
  return new UserModel({ id: ref.id, ...safeUser });
}