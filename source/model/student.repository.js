import studentModel from "./student.schema.js"
import errorHandlerMiddleware from "../../errorHandler/errorHandler.js"


export default class StudentRepository{

    async allStudent(){
        const students = await studentModel.find();
        return students
    }

    async addStudent(data){
        const newStudent = new studentModel(data);
        return await newStudent.save()
    }

    async updateStatus(id){
        const data = await studentModel.findById(id);
        data.status = data.status=="placed"?"not_placed":"placed";
        await data.save()
        return data

    }
}