import jwt from 'jsonwebtoken'

//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key')
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed!' })
  }
}
//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!
//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!
//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!
//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!
//  !!!!!!!!!! BUSCAR USO VIDEO MIDU U OTROS PARA ENTENDER FUNCIONAMIENTO !!!!!!!!!!!!!
module.exports = authenticate
