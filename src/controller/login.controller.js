import jwt from 'jsonwebtoken'

import { createUser, verifyCredentials } from '../service/login.service.js'

export const loginUser = async (req,res) => {
try {
    const { email, password } = req.body
    const user = await verifyCredentials(email,password)
    
    const tokenPayload = {
      id: user.id,
      email: user.email,
    }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

    res.status(200).json({msj:"Usuario logueado con éxito",token, user})
  } catch (error) {
    res.status(401).json({message: error.message})
  }
}


export const createUserController = async (req,res) => {
    try{
        const newUser = await createUser(req.body);
        res.status(201).json(newUser)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
}