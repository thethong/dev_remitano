import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { body } from "express-validator";
import validate from "../middlewares/validate.js";
import responseStatus from "../variables/response-status.js";
import util from "util";
import constant from "../variables/constant.js";

// Init express router
const router = express.Router();

const authController = new AuthController();

// route API login or register
router.post(
  "/login-register",
  [
    // check
    body("user_name")
      .exists()
      .withMessage(
        util.format(
          responseStatus.http.validate.missing_field.error_message,
          "user_name"
        )
      ),
    body("user_name")
      .not()
      .trim()
      .isEmpty()
      .withMessage(
        util.format(
          responseStatus.http.validate.is_empty.error_message,
          "user_name"
        )
      ),
    body("user_name")
      .isLength({ max: constant.MAX_LENGTH_USER_NAME })
      .withMessage(
        util.format(
          responseStatus.http.validate.max_length_100.error_message,
          "user_name"
        )
      ),
    body("password")
      .exists()
      .withMessage(
        util.format(
          responseStatus.http.validate.missing_field.error_message,
          "password"
        )
      ),
    body("password")
      .not()
      .trim()
      .isEmpty()
      .withMessage(
        util.format(
          responseStatus.http.validate.is_empty.error_message,
          "password"
        )
      ),
    body("password")
      .isLength({ max: constant.MAX_LENGTH_PASSWORD })
      .withMessage(
        util.format(
          responseStatus.http.validate.max_length_255.error_message,
          "password"
        )
      ),
  ],
  validate,
  authController.loginOrRegister
);

// export router
export default router;
