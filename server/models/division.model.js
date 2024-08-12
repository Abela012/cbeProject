import {model, Schema} from "mongoose"

const DivisionSchema = new Schema({
    name:{type: String},
    status:{type: Number, default:0}

},

{timestamp: true} 
)
const Division = model("Division", DivisionSchema)
export default Division