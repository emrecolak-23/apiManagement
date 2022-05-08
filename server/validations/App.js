import Joi from 'joi'

export const createValidation = Joi.object({
  name: Joi.string()
  .required()
  .min(5)
  .max(50)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.min": `api adı en az {#limit} karakterden oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
    "any.required": `api adı girilmesi zorunludur`
  }),
  userId: Joi.string()
  .required()
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "any.required": `api adı girilmesi zorunludur`
  }),
  apiKey: Joi.string()
  .required()
  .max(200)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
    "any.required": `api adı girilmesi zorunludur`
  }),
  description: Joi.string()
  .max(500)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
  }),
})

export const updateValidation = Joi.object({
  name: Joi.string()
  .required()
  .min(5)
  .max(50)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.min": `api adı en az {#limit} karakterden oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
    "any.required": `api adı girilmesi zorunludur`
  }),
  apiKey: Joi.string()
  .required()
  .max(200)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
    "any.required": `api adı girilmesi zorunludur`
  }),
  description: Joi.string()
  .max(500)
  .messages({
    "string.base": `api adı metin olarak oluşturulmalıdır`,
    "string.max": `api adı en fazla {#limit} karakterden oluşturulmalıdır`,
  }),
  time: Joi.number()
  .required()
  .messages({
    "number.base": `time sayı olarak oluşturulmalıdır`,
    "any.required": `time girilmesi zorunludur`
  }),
  limit: Joi.number()
  .required()
  .messages({
    "number.base": `limit sayı olarak oluşturulmalıdır`,
    "any.required": `limit girilmesi zorunludur`
  })
})

export const allowBlockValidation = Joi.object({
  ipAdress: Joi.string()
    .pattern(new RegExp('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'))
    .message({
      "string.base" : "ip adresi metin formatında oluşuturulmalıdır",
      "string.pattern.base" : "ip adresi formatını doğru giriniz"
    })
})
