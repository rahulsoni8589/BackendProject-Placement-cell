import Repository from "../model/user.repository.js"
import jwt from "jsonwebtoken"

export default class Controller{
    constructor(){
        this.Repository = new Repository()
    }

    getSignUp(req,res){
        try{        
            res.render("signup", {access:false});
        }catch(err){
            next(err);
        }
        
    }

    getSignIn(req,res){
        try{
            res.render("signin", {access:false});
        }catch(err){
            next()
        }
        
    }

    async postSignUp(req,res,next){
        try{
            console.log(req.body)
            const data = await this.Repository.postUser(req.body)
            res.render("signin", {access:false})
        }catch(err){
            next(err)
        }
    }
    // ('rememberme', '1', { maxAge: 900000, httpOnly: true })

    async postSignIn(req,res){
        console.log(req.body)
        const user = await this.Repository.findUser(req.body)
        console.log(user)
        if(user){
            const token = jwt.sign({userID: user._id},"SecretKEY12&&^" , { expiresIn: '1h' })
            res.cookie("token", token, { maxAge: 900000, httpOnly: false }).render("home", {access:true,log:false});
        }
        else{res.render("home", {access:false, log:true})};
    }

}