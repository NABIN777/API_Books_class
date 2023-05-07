const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");




router.post("/register", (req, res, next) => {

  const { username, password, fullname, email } = req.body;

  User.findOne({ username: req.body.username })

    .then((user) => {

      // res.json(user)

      if (user) return res.status(400).json({ error: "duplicate username" });

      bcrypt.hash(password, 10, (err, hash) => {

        if (err) return res.status(500).json({ error: err.message });

        User.create({ username, password: hash, fullname, email })

          .then((user) => {

            res.status(201).json(user);

          })

          .catch(next);

      });

    })

    .catch(next);

});
router.post('/login',(req,res,next)=>{
    user.findOne({username:req.body.username})
    .then((user)=>{
        if(!user) res.status(400).json({error:"user is not register"})
        bcrypt.compare(req.body.password,(err,success)=>{

            if(err) return res.status(500).json({error:err.message})
            if(!success) return res.status(400).json({error:'password is matched'});
            const payload={
                id:user.id,
                username:user.username
            }
            Jwt.sign(payload,process.env.SECRET,
                {expiresIN:'1d'},
                (err,token)=>{
                    if(err) return res.status(500).json({error:err.message})
                    res.json({status:'success',token:token})
                })

        })
    }).catch(next)
})




module.exports = router;