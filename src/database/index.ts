import { mongoose } from "@typegoose/typegoose"
require('dotenv').config()

async function databaseConnect() {
     await mongoose.connect(process.env.MONGO_URL ?? "")
}
databaseConnect().then(() => {
     console.log("Connected to database")
}).catch((e) => {
     console.log(e)
})

export { databaseConnect }