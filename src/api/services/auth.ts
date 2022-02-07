import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser';
import UserModel from '../../models/user';
import { RegisterQuery, LoginQuery } from '../../validators/authValidators';

export class AuthService {
  /**
   * Register a user in DB
   * @param query - see AuthQuery
   * @throws Will throw an error if user email already exists
   */
  async registerUser(query: RegisterQuery): Promise<IUser> {
    try {
      const { name, email, password } = query;
      const user = await UserModel.findOne({ email }, 'email').exec();
      if (user?.email) throw new Error('Email already exists');
      if (user) throw new Error('Unable to register user');

      const newUser = new UserModel({
        name,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10),
        token: '',
      });

      await newUser.save();

      const token = jwt.sign(
        { user_id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET || '',
        { expiresIn: '7d' }
      );
      newUser.token = token;
      await newUser.save();
      return newUser;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /**
   * Login a user
   * @param query - see AuthQuery
   * @throws Will throw an error if user does not exist or if password is
   * invalid
   */
  async loginUser(query: LoginQuery): Promise<IUser> {
    try {
      const { email, password } = query;
      const user = await UserModel.findOne(
        { email: email.toLowerCase() },
        '_id name email password'
      ).exec();
      if (!user) throw new Error('User does not exist');
      if (!(await bcrypt.compare(password, user.password)))
        throw new Error('Invalid password');

      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.JWT_SECRET || '',
        { expiresIn: '7d' }
      );

      user.token = token;
      user.save();

      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default new AuthService();
