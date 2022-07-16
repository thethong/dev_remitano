import * as util from "util";
import jsonwebtoken from "jsonwebtoken";

class JWT {
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
}

export default JWT;
