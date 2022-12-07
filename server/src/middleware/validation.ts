import { celebrate, Joi, Segments } from "celebrate";

export const validatePastes = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().integer(),
    search: Joi.string().alphanum(),
    tags: Joi.boolean(),
    orderBy: Joi.string().valid("title", "author", "date"),
  },
});
