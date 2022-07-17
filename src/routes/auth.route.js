import express from "express";
import AuthController from "../controllers/auth.controller.js";
import {body} from "express-validator"
import validate from "../middlewares/validate.js";
import responseStatus from "../variables/response-status.js";
import util from "util";
import constant from "../variables/constant.js";

// Init express router
const router = express.Router();

const authController = new AuthController();

router.post('/login-register',[
  // check 
  body('user_name').exists().withMessage(util.format(responseStatus.http.validate.missing_field.error_message, "user_name")),
  body('user_name').not().trim().isEmpty().withMessage(util.format(responseStatus.http.validate.is_empty.error_message, "user_name")),
  body('user_name').isLength({ max: constant.MAX_LENGTH_USER_NAME }).withMessage(util.format(responseStatus.http.validate.max_length_100.error_message, "user_name")),
  body('password').exists().withMessage(util.format(responseStatus.http.validate.missing_field.error_message, "password")),
  body('password').not().trim().isEmpty().withMessage(util.format(responseStatus.http.validate.is_empty.error_message, "password")),
  body('password').isLength({ max: constant.MAX_LENGTH_PASSWORD }).withMessage(util.format(responseStatus.http.validate.max_length_255.error_message, "password")),
  // body('accept_task_date').exists().withMessage(util.format(responseStatus.http.validate.missing_field.error_message, "accept_task_date")),
  // body('accept_task_date').not().trim().isEmpty().withMessage(util.format(responseStatus.http.validate.is_empty.error_message, "accept_task_date")),
  // body('accept_task_date').matches(constant.MATCH_TYPE_DATE_STRING).withMessage(util.format(responseStatus.http.validate.wrong_format_date.error_message, "accept_task_date")),
  // body('accept_task_date').custom(value=>{
  //   return HandleDate.checkValidDate(value)
  // }).withMessage(util.format(responseStatus.http.validate.date_invalid.error_message, "accept_task_date")),
], validate, authController.loginOrRegister);

 // export router
export default router;