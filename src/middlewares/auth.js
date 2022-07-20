import JWT from "../libs/jwt.js";
import responseStatus from "../variables/response-status.js";

/**
 * Middleware using for authentication
 * @param {Object} req - req object
 * @param {Object} res - res object
 * @param {Callback} next - next function
 */
export default async function isAuth(req, res, next) {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.x_authorization;
  if (!accessTokenFromHeader) {

    return res.status(responseStatus.http.unauthorized.status).json({
      error_message: responseStatus.http.unauthorized.missing_access_token_header.error_message,
    })
  }

  // jwt
  const jwt = new JWT();

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  // verify token 
  const verified = await jwt.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );

  // check permissiion
  if (!verified) {
    return res.status(responseStatus.http.unauthorized.status).json({
      error_message: responseStatus.http.unauthorized.not_permiss_access.error_message,
    })
  }

  // save payload to req
  req.payload = verified.payload;

  return next();
}
