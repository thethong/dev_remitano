import { validationResult } from "express-validator";
import responseStatus from "../variables/response-status.js";

/**
 * Middleware using for validate
 * @param {Object} req - req object
 * @param {Object} res - res object
 * @param {Callback} next - next function
 */
export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(responseStatus.http.validate.status).json({
      // get first error
      error_message: errors.array()[0].msg,
    });
  }

  next();
};
