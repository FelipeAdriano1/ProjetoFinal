import { getDb } from '../config/database';
import { ObjectId } from 'mongodb';

export const addRevenue = async (revenue: any) => {
  const result = await getDb().collection('revenues').insertOne(revenue);
  return result.insertedId;
};

export const getRevenues = async () => {
  return await getDb().collection('revenues').find().toArray();
};

export const getRevenueById = async (id: string) => {
  return await getDb().collection('revenues').findOne({ _id: new ObjectId(id) });
};

export const updateRevenue = async (id: string, revenue: any) => {
  const result = await getDb().collection('revenues').updateOne({ _id: new ObjectId(id) }, { $set: revenue });
  return result.modifiedCount > 0;
};

export const deleteRevenue = async (id: string) => {
  const result = await getDb().collection('revenues').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};
