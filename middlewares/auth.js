const jwt=require()
const verifyUser = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token)return res.status(401).json({error:'auth token not'})
    token=token.split('')[1]
    jwt.verify(token,process.env.SECRET,(err,payload)=>{
        if(err) return res.status(401).json({error:'auth token not'})
        req.user = payload;
        next()
    })
    // console.log
    next()

console.log("inside the middleware")}
module.exports = {verifyUser}