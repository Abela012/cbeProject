import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    
    name:{type: String},
    email:{type: String},
    password:{type: string},
    roletype:{type: String},
    otp:{type: String},
    status:{type: String},
    officeId:{type: String}

},
{timestamp: true} 
)
const User = model("User", UserSchema)
export default User