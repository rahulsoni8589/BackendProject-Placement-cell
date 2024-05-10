import ObjectId from "mongodb";
import { userModel } from "./user.schema.js";

export default class Repository{
    async postUser(data){
        console.log(data)
        const user = await new userModel(data).save();
        return
    }

    async findUser(data){
        const user = await userModel.findOne(data)
        return user
    }
    
}