const jwt = require('jsonwebtoken')
 

const authUSer=(req,res,next)=>{
    const authHeader= req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({msg:"No token avalable"})
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({msg:"Not valid token"})
        }
        req.user=user
    })
    next()
} 

module.exports={
    authUSer
}