import errorHandlerMiddleware from "../../errorHandler/errorHandler.js";
import StudentRepository from "../model/student.repository.js";
import fs from "fs";

export default class StudentController{
    constructor(){
        this.Repository = new StudentRepository();
    }

    async viewAllStudent(req,res,next){
        try{
            const students = await this.Repository.allStudent()
            res.render("studentlist", {studentData:students, access:true})
        }catch(err){
            next(err)
        }
    }

    async getAddStudent(req,res,next){
        res.render("addstudent",{access:true})
    }

    async postAddStudent(req,res,next){
        try{
            const data = req.body;
            await this.Repository.addStudent(data)
            const students = await this.Repository.allStudent()
            res.render("studentlist", {studentData:students,access:true})
        }catch(err){
            next()
        }    
    }

    async updateStatus(req,res,next){
        try{
            console.log(req.params.id)
            const id = req.params.id
            const data = await this.Repository.updateStatus(id)
            console.log(data)
            res.redirect("/allstudent");
        }catch(err){
            console.log(err)
            next()
        }    
    }

    
    };