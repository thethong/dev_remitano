import express from "express";
import ShareController from "../controllers/share.controller.js";
import isAuth from "../middlewares/auth.js";
import {body} from "express-validator"
import validate from "../middlewares/validate.js";
import responseStatus from "../variables/response-status.js";
import util from "util";
import constant from "../variables/constant.js";

// Init express router
const router = express.Router();

const shareController = new ShareController();

router.post('/share-movie', isAuth,[
  // check 
  body('user_name').exists().withMessage(util.format(responseStatus.http.validate.missing_field.error_message, "user_name")),
  body('user_name').not().trim().isEmpty().withMessage(util.format(responseStatus.http.validate.is_empty.error_message, "user_name")),
  body('user_name').isLength({ max: constant.MAX_LENGTH_USER_NAME }).withMessage(util.format(responseStatus.http.validate.max_length_100.error_message, "user_name")),
  body('url').exists().withMessage(util.format(responseStatus.http.validate.missing_field.error_message, "url")),
  body('url').not().trim().isEmpty().withMessage(util.format(responseStatus.http.validate.is_empty.error_message, "url")),
  body('url').matches(constant.MATCH_TYPE_YOUTUBE_URL).withMessage(util.format(responseStatus.http.validate.wrong_format_youtube_url.error_message, "url")),
],validate, shareController.shareMovie);
router.get('/list-all-shared-movie', shareController.getListAllSharedMovie);

 // export router
export default router;