import { body } from "express-validator";

export const title = body("title")
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage("Название должно быть от 2 до 100 символов");
