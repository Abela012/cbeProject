import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
const port = process.env.PORT
const app = express()
app.use(cors({origin:[]}))
app.listen(port,()=>{
console.log(`server statrt on port:${port}`);
})