import { getDb } from '../config/database'
import { ObjectId } from 'mongodb'

export const addExpense = async (expense: any) => {
    const result = await getDb().collection("expenses").insertOne(expense)
    return result.insertedId
}

export const getExpenses = async () => {
    const result = await getDb().collection("expenses").find().toArray()
    return result
}

export const getExpenseById = async (id: string) => {
    const result = await getDb().collection("expenses").findOne({ _id: new ObjectId(id) })
    return result
}

export const updateExpense = async (id: string, expense: any) => {
    const result = await getDb().collection("expenses").updateOne(
        { _id: new ObjectId(id) },
        { $set: expense }
    )
    return result.modifiedCount > 0
}

export const deleteExpense = async (id: string) => {
    const result = await getDb().collection("expenses").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
}