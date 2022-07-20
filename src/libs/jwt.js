import * as util from "util";
import jsonwebtoken from "jsonwebtoken";

/**
 * JWT: Json Web Token Class
 */
class JWT {
  /**
   * Generate token
   * @param {Object} payload - payload object
   * @param {Object} secretSignature - secret Signature object
   * @returns {Object} - result return after generate
   */
  async generateToken(payload, secretSignature, tokenLife) {
    try {
      // convert callback to promise
      const sign = util.promisify(jsonwebtoken.sign).bind(jsonwebtoken);

      return await sign(
        {
          payload,
        },
        secretSignature,
        {
          algorithm: "HS256",
          expiresIn: tokenLife,
        }
      );
    } catch (error) {
      console.log(`Error in generate access token:  + ${error}`);
      return null;
    }
  }

  /**
   * Generate token
   * @param {String} token - token
   * @param {String} secretKey - secret Key
   * @returns {Object} - result return after verify
   */
  async verifyToken(token, secretKey) {
    try {
      const verify = util.promisify(jsonwebtoken.verify).bind(jsonwebtoken);
      return await verify(token, secretKey);
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`);
      return null;
    }
  }
}

export default JWT;
