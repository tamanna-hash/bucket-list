import { collections } from "./collections"
import { dbConnect } from "./dbConnect"

export const getGoalsCollection = async ()=>{
    const {db}= await dbConnect()
    return db.collection(collections.GOALS)
}