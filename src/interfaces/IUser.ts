import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
