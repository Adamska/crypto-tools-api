import Joi from 'joi';
import { validateQuery } from '.';

export type RegisterQuery = {
  name: string;
  email: string;
  password: string;
};
export const validationRegister = (query: any) => {
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  });
  return validateQuery(validationSchema, query) as RegisterQuery;
};

export type LoginQuery = {
  email: string;
  password: string;
};
export const validationLogin = (query: any) => {
  const validationSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  });
  return validateQuery(validationSchema, query) as LoginQuery;
};
