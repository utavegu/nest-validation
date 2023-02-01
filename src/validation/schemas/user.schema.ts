/* eslint-disable prettier/prettier */
import * as Joi from 'joi';

export const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(2)
    .required(),
  
  lastName: Joi.string()
    .min(2)
    .required(),

  age: Joi.number()
    .min(0)
    .max(120)
    .required(),

  isMale: Joi.boolean()
    .required(),

  // В дипломе сделай чтобы русские буквы не хавал
  email: Joi.string()
    .email()
    .required(),
  
  // Я не маэстро регулярок, но по-моему ты не должен хавать строку "1112241", а ты хаваешь
  phone: Joi.string()
    .pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)
    .optional(),

  about: Joi.string()
    .optional(),
});
