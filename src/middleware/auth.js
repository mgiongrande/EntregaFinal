import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({message: 'Acceso denegado.'})

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({message: 'Token inválido o expirado.'})
  }
}