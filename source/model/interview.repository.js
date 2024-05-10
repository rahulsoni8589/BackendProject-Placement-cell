import { ObjectId } from "mongodb";
import interviewModel from "./interview.schema.js";

export default class InterviewRepo{
    async addInterview(data){
        const {id,name,company,date} = data
        const result = await new interviewModel({
            studentId:id,
            name: name,
            date:date,
            company:company
        }).save()
        return result
    }

    async allInterview(){
        const interviewers = await interviewModel.find().populate({
            path: 'studentId',
            select: ["batch","email","college"], // You can select specific fields if needed
            model: 'Student', // Assuming 'Student' is the model name for student documents
            options: { 
                key: 'abc' // Assigning 'studentData' as the key for the populated field
            }})
        return interviewers
    }

    async download(){
        const interviewers = await interviewModel.find().populate({
            path: 'studentId',
            model: 'Student', // Assuming 'Student' is the model name for student documents
           })
        
        return interviewers
    }

    async interviewUpdate(id){
        const data = await interviewModel.findById(id)
        return data       
    }

    async postInterviewUpdate(newStatus,id){
        console.log(id)
        const update = await interviewModel.findById(id)
        console.log(update)
        update.status = newStatus;
        await update.save()
        return 
    }
}
