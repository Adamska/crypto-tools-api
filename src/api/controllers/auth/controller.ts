import { validationRegister } from './../../../validators/authValidators';
import { Request, Response } from 'express';
import AuthService from '../../services/auth';

export class Controller {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const queryValues = validationRegister(req.body);
      await AuthService.registerUser(queryValues);
      res.json({ success: true });
    } catch (err: any) {
      res.status(400).json({
        status: err?.status,
        message: unescape(err?.message),
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const queryValues = validationRegister(req.body);
      const user = await AuthService.loginUser(queryValues);
      const filteredUser = (({ _id, name, email, token }) => ({
        _id,
        name,
        email,
        token,
      }))(user);

      res.json(filteredUser);
    } catch (err: any) {
      res.status(400).json({
        status: err?.status,
        message: unescape(err?.message),
      });
    }
  }
}
export default new Controller();
