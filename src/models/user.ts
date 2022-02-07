import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const schema: mongoose.SchemaDefinition = {
  name: { type: mongoose.SchemaTypes.String, required: true },
  email: { type: mongoose.SchemaTypes.String, unique: true, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  token: { type: mongoose.SchemaTypes.String },
};

const userSchema: mongoose.Schema = new mongoose.Schema(schema, {
  timestamps: true,
});

const UserModel = mongoose.model<IUser & mongoose.Document>(
  'User',
  userSchema,
  'users'
);

export default UserModel;
