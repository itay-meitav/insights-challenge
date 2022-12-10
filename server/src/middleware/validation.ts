import { celebrate, Joi, Segments } from "celebrate";

export const validatePastes = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().integer(),
    search: Joi.string(),
    tags: Joi.boolean(),
    sort: Joi.string().valid("title", "author", "date", "content"),
    order: Joi.number().integer().valid(1, -1),
  },
});
